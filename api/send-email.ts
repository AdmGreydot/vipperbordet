import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const {
            companyName,
            contactName,
            email,
            phone,
            textKilen,
            color,
            quantity,
            kommentar
        } = await request.json();
        if (!companyName || !contactName ||!email || !textKilen || !color || !quantity) {
            return Response.json(
                {
                    error: 'Name, email and message are required',
                },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: "Vipperbordet <onboarding@resend.dev>",
            to: ['isurdu3@gmail.com'],
            replyTo: email,
            subject: "Ny bestilling af bordkiler",
        
            html: `
                <!DOCTYPE html>
                <html lang="da">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Ny henvendelse</title>
                </head>
        
                <body style="
                    margin: 0;
                    padding: 40px 20px;
                    background-color: #F5F4F0;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #595A5C;
                ">
                    <div style="
                        max-width: 620px;
                        margin: 0 auto;
                        background: #ffffff;
                    ">
        
                        <div style="
                            padding: 32px 40px;
                            border-bottom: 1px solid #D9D9D9;
                        ">
                            <div style="
                                font-size: 24px;
                                font-weight: 700;
                                letter-spacing: -0.04em;
                                color: #000000;
                            ">
                                Vipperbordet
                            </div>
                        </div>
        
                        <div style="padding: 40px;">
                            <h2>Ny bestilling</h2>

                            <p><strong>Virksomhed:</strong> ${companyName}</p>
                            <p><strong>Kontaktperson:</strong> ${contactName}</p>
                            <p><strong>E-mail:</strong> ${email}</p>
                            <p><strong>Telefon:</strong> ${phone || "-"}</p>
                            <p><strong>Tekst på bordkilen:</strong> ${textKilen}</p>
                            <p><strong>Farve:</strong> ${color}</p>
                            <p><strong>Antal:</strong> ${quantity}</p>
                            <p><strong>Kommentar:</strong> ${kommentar || "-"}</p>
                        </div>
        

        
                    </div>
                </body>
                </html>
            `,
        });
        if (error) {
            console.error('Resend error:', error);

            return Response.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return Response.json({
            success: true,
            data,
        });

    } catch (error) {
        console.error('Send email error:', error);

        return Response.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}