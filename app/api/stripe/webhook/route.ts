import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type Stripe from 'stripe';

export async function POST(request: Request) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Missing Stripe signature' },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error) {
        console.error('Webhook signature verification failed:', error);

        return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 400 }
        );
    }

    if (
        event.type === 'checkout.session.completed' ||
        event.type === 'checkout.session.async_payment_succeeded'
    ) {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.metadata?.site !== 'vipperbordet') {
            return NextResponse.json({ received: true });
        }
        if (session.payment_status !== 'paid') {
            return NextResponse.json({ received: true });
        }

        const orderId = session.metadata?.order_id;
        const invoiceId = session.metadata?.invoice_id;

        if (!orderId || !invoiceId) {
            console.error('Missing order or invoice metadata:', session.id);

            return NextResponse.json(
                { error: 'Missing metadata' },
                { status: 400 }
            );
        }

        const paidAt = new Date().toISOString();

        const { error: orderError } = await supabaseAdmin
            .from('orders')
            .update({
                status: 'paid',
                updated_at: paidAt,
            })
            .eq('id', orderId);

        if (orderError) {
            console.error('Order update error:', orderError);

            return NextResponse.json(
                { error: 'Could not update order' },
                { status: 500 }
            );
        }

        const { error: invoiceError } = await supabaseAdmin
            .from('invoices')
            .update({
                status: 'paid',
                paid_at: paidAt,
            })
            .eq('id', invoiceId)
            .eq('order_id', orderId);

        if (invoiceError) {
            console.error('Invoice update error:', invoiceError);

            return NextResponse.json(
                { error: 'Could not update invoice' },
                { status: 500 }
            );
        }
    }

    return NextResponse.json({ received: true });
}