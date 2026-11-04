import { Resend } from 'resend';
import React from 'react';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { renderToBuffer } from '@react-pdf/renderer';
import InvoiceDocument, {
  type InvoiceData,
} from '@/lib/invoice/InvoiceDocument';

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value: unknown): string =>
  String(value ?? '-')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const formatPrice = (ore: number) =>
  new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
  }).format(ore / 100);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      companyName,
      contactName,
      email,
      adresse,
      postnumber,
      city,
      cvr,
      phone,
      textKilen,
      color,
      quantity,
      isRepeatOrder,
      kommentar,
    } = body;

    // Basic server-side validation
    const requiredFields = [
      companyName,
      contactName,
      email,
      adresse,
      postnumber,
      city,
      textKilen,
      color,
    ];

    if (
      requiredFields.some(
        (value) => typeof value !== 'string' || !value.trim()
      )
    ) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const quantityValue = Number(quantity);

    if (
      !Number.isInteger(quantityValue) ||
      quantityValue < 50 ||
      quantityValue % 10 !== 0
    ) {
      return NextResponse.json(
        { error: 'Invalid quantity.' },
        { status: 400 }
      );
    }

    if (typeof isRepeatOrder !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid order type.' },
        { status: 400 }
      );
    }

    // Create order and invoice in Supabase
    const { data: orderResult, error: orderError } =
      await supabaseAdmin.rpc('create_order_with_invoice', {
        p_order: {
          companyName: companyName.trim(),
          contactName: contactName.trim(),
          email: email.trim(),
          adresse: adresse.trim(),
          postnumber: postnumber.trim(),
          city: city.trim(),
          cvr: cvr || '',
          phone: phone || '',
          textKilen: textKilen.trim(),
          color,
          quantity: quantityValue,
          isRepeatOrder,
          kommentar: kommentar || '',
        },
      });

    if (orderError || !orderResult) {
      console.error('Order creation error:', orderError);

      return NextResponse.json(
        { error: 'Could not create the order.' },
        { status: 500 }
      );
    }

    const {
        order_id,
        invoice_id,
        invoice_number,
        subtotal_ore,
        vat_ore,
        total_ore,
    } = orderResult;
    // Get invoice dates from database
    const { data: invoice, error: invoiceError } = await supabaseAdmin
    .from('invoices')
    .select('invoice_number, invoice_date, due_date')
    .eq('id', invoice_id)
    .single();

    if (invoiceError || !invoice) {
    console.error('Invoice fetch error:', invoiceError);

    return NextResponse.json(
    { error: 'Could not retrieve invoice details.' },
    { status: 500 }
    );
    }

    const formatDate = (date: string) =>
    new Intl.DateTimeFormat('da-DK').format(
    new Date(`${date}T00:00:00`)
    );

    // Prepare PDF data
    const invoiceData: InvoiceData = {
    invoiceNumber: String(invoice.invoice_number),
    invoiceDate: formatDate(invoice.invoice_date),
    dueDate: formatDate(invoice.due_date),

    companyName,
    cvr: cvr || '',
    address: adresse,
    postalCode: postnumber,
    city,

    quantity: quantityValue,
    isRepeatOrder,

    subtotal: subtotal_ore / 100,
    vat: vat_ore / 100,
    total: total_ore / 100,
    };

    // Generate PDF
    const pdfElement = React.createElement(
      InvoiceDocument,
      { data: invoiceData }
    ) as unknown as Parameters<typeof renderToBuffer>[0];
    
    const pdfBuffer = await renderToBuffer(pdfElement);
    const pdfPath = `${order_id}/invoice-${invoice_number}.pdf`;

    const { error: uploadError } = await supabaseAdmin.storage
    .from('invoices')
    .upload(pdfPath, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true,
    });

    if (uploadError) {
    console.error('PDF upload error:', uploadError);

    return NextResponse.json(
        { error: 'Could not save invoice PDF.' },
        { status: 500 }
    );
    }

    // Save PDF path in invoice record
    const { error: updateError } = await supabaseAdmin
    .from('invoices')
    .update({ pdf_path: pdfPath })
    .eq('id', invoice_id);

    if (updateError) {
    console.error('Invoice update error:', updateError);

    return NextResponse.json(
        { error: 'Could not update invoice record.' },
        { status: 500 }
    );
    }

    // Prepare email rows
    const customerRows = [
      ['Virksomhed', companyName],
      ['CVR-nummer', cvr || '-'],
      ['Adresse', adresse],
      ['Postnummer', postnumber],
      ['By', city],
      ['Kontaktperson', contactName],
      ['E-mail', email],
      ['Telefon', phone || '-'],
    ];

    const productRows = [
      ['Tekst på bordkilen', textKilen],
      ['Farve', color],
      ['Antal', `${quantityValue} stk.`],
      ['Bestillingstype', isRepeatOrder ? 'Genbestilling' : 'Første bestilling'],
      ['Stempelgebyr', formatPrice(isRepeatOrder ? 0 : 15000)],
      ['Pris pr. bordkile', '3,50 kr.'],
      ['Subtotal ekskl. moms', formatPrice(subtotal_ore)],
      ['Moms (25%)', formatPrice(vat_ore)],
      ['Pris i alt inkl. moms', formatPrice(total_ore)],
    ];

    const renderRows = (rows: string[][]) =>
      rows
        .map(
          ([label, value]) => `
            <tr>
              <td style="
                padding: 12px 0;
                border-bottom: 1px solid #EAE9E5;
                color: #888888;
                width: 42%;
                vertical-align: top;
              ">
                ${escapeHtml(label)}
              </td>
              <td style="
                padding: 12px 0;
                border-bottom: 1px solid #EAE9E5;
                color: #303B37;
                font-weight: bold;
                vertical-align: top;
                word-break: break-word;
              ">
                ${escapeHtml(value)}
              </td>
            </tr>
          `
        )
        .join('');

    // Send notification to the seller
    let notificationSent = false;

    try {
      const { error: emailError } = await resend.emails.send({
        from: 'Vipperbordet <noreply@greydot.dk>',
        to: ['vipperbordet@greydot.dk'],
        replyTo: email,
        subject: `Ny bestilling #${invoice_number} – Vipperbordet`,
        html: `
          <!DOCTYPE html>
          <html lang="da">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ny bestilling</title>
          </head>
          <body style="
            margin: 0;
            padding: 32px 16px;
            background-color: #F5F4F0;
            font-family: Arial, Helvetica, sans-serif;
            color: #595A5C;
          ">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" cellpadding="0"
                    cellspacing="0" style="max-width: 620px;">

                    <tr>
                      <td style="background-color: #122D28; padding: 30px 36px;">
                        <div style="
                          color: #F5F1E8;
                          font-size: 26px;
                          font-weight: bold;
                          letter-spacing: -1px;
                        ">
                          Vipperbordet
                        </div>
                        <div style="
                          margin-top: 8px;
                          color: #C8D0C8;
                          font-size: 10px;
                          letter-spacing: 2px;
                          text-transform: uppercase;
                        ">
                          Ordrenotifikation
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="background-color: #FFFFFF; padding: 36px;">
                        <div style="
                          display: inline-block;
                          background-color: #EEF3EC;
                          color: #42634B;
                          padding: 7px 12px;
                          font-size: 11px;
                          font-weight: bold;
                          letter-spacing: 1px;
                          text-transform: uppercase;
                        ">
                          Ny bestilling
                        </div>

                        <h1 style="
                          margin: 22px 0 10px;
                          color: #122D28;
                          font-family: Georgia, serif;
                          font-size: 28px;
                          font-weight: normal;
                        ">
                          Der er kommet en ny bestilling!
                        </h1>

                        <p style="font-size: 14px; line-height: 1.7; color: #777;">
                          Bestilling #${escapeHtml(invoice_number)} er modtaget via vipperbordet.dk.
                        </p>

                        <h2 style="margin: 30px 0 14px; color: #122D28; font-size: 15px;">
                          Virksomhedsoplysninger
                        </h2>

                        <table role="presentation" width="100%" cellpadding="0"
                          cellspacing="0" style="font-size: 13px;">
                          ${renderRows(customerRows)}
                        </table>

                        <h2 style="margin: 30px 0 14px; color: #122D28; font-size: 15px;">
                          Produkt og pris
                        </h2>

                        <table role="presentation" width="100%" cellpadding="0"
                          cellspacing="0" style="font-size: 13px;">
                          ${renderRows(productRows)}
                        </table>

                        <div style="
                          margin-top: 30px;
                          padding: 20px;
                          background-color: #F5F4F0;
                          border-left: 3px solid #C49A68;
                        ">
                          <div style="
                            margin-bottom: 10px;
                            color: #888888;
                            font-size: 10px;
                            font-weight: bold;
                            letter-spacing: 1px;
                            text-transform: uppercase;
                          ">
                            Kommentar
                          </div>
                          <p style="
                            margin: 0;
                            color: #454C48;
                            font-size: 13px;
                            line-height: 1.7;
                            white-space: pre-line;
                          ">
                            ${escapeHtml(kommentar || 'Ingen kommentar')}
                          </p>
                        </div>

                        <p style="
                          margin-top: 30px;
                          color: #888888;
                          font-size: 12px;
                        ">
                          Order ID: ${escapeHtml(order_id)}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="
                        padding: 22px 30px;
                        background-color: #E9E4DA;
                        text-align: center;
                      ">
                        <p style="margin: 0; color: #77736B; font-size: 11px;">
                          Denne besked er sendt automatisk fra
                          <a href="https://vipperbordet.dk"
                            style="color: #122D28; text-decoration: none;">
                            vipperbordet.dk
                          </a>
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      });

      if (emailError) {
        console.error('Resend error:', emailError);
      } else {
        notificationSent = true;
      }
    } catch (emailError) {
      console.error('Notification email failed:', emailError);
    }

    // Send example invoice to the customer
    let customerEmailSent = false;

    try {
      const { error: customerEmailError } = await resend.emails.send({
        from: 'Vipperbordet <noreply@greydot.dk>',
        to: [email],
        replyTo: 'vipperbordet@greydot.dk',
        subject: `Eksempel på faktura #${invoice_number} – Vipperbordet`,
        html: `
          <div style="
            max-width: 600px;
            margin: 0 auto;
            padding: 35px;
            background: #F5F4F0;
            font-family: Arial, Helvetica, sans-serif;
            color: #303B37;
          ">
            <div style="
              padding: 25px;
              background: #122D28;
              color: #F5F1E8;
            ">
              <h1 style="margin: 0; font-size: 25px;">
                Vipperbordet
              </h1>
              <p style="
                margin: 8px 0 0;
                color: #C8D0C8;
                font-size: 11px;
                letter-spacing: 2px;
              ">
                FAKTURA
              </p>
            </div>

            <div style="padding: 30px; background: #FFFFFF;">
              <h2 style="color: #122D28; font-size: 21px;">
                Tak for jeres bestilling!
              </h2>

              <p style="font-size: 14px; line-height: 1.7;">
                Hej ${escapeHtml(contactName)},<br><br>
                Tak for jeres bestilling hos Vipperbordet.
                Vi har vedhæftet en eksempel-faktura med
                oplysninger om jeres bestilling.
              </p>

              <p style="
                padding: 15px;
                background: #F5F4F0;
                font-size: 12px;
                line-height: 1.6;
              ">
                <strong>Bemærk:</strong> Dette er en testfaktura.
                Bankoplysningerne er ikke endelige, og dokumentet
                skal ikke bruges til betaling.
              </p>

              <p style="font-size: 14px; line-height: 1.7;">
                Har I spørgsmål, er I velkomne til at kontakte os
                på vipperbordet@greydot.dk.
              </p>

              <p style="font-size: 14px;">
                Med venlig hilsen<br>
                <strong>Vipperbordet</strong>
              </p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: `Eksempel-faktura-${invoice_number}.pdf`,
            content: pdfBuffer.toString('base64'),
          },
        ],
      });

      if (customerEmailError) {
        console.error('Customer email error:', customerEmailError);
      } else {
        customerEmailSent = true;
      }
    } catch (customerEmailError) {
      console.error('Customer email failed:', customerEmailError);
    }

    return NextResponse.json({
      success: true,
      orderId: order_id,
      invoiceNumber: invoice_number,
      notificationSent,
      customerEmailSent,
    });
  } catch (error) {
    console.error('Order submission error:', error);

    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}