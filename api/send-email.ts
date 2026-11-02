import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const escapeHtml = (value: unknown): string =>
    String(value ?? "-")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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
            from: "Vipperbordet <kontakt@greydot.dk>",
            to: ['isurdu3@gmail.com'],
            replyTo: email,
            subject: "Ny bestilling af bordkiler",    
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

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td align="center">

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                border="0" style="max-width: 620px;">

                                <!-- Header -->
                                <tr>
                                    <td style="
                                        background-color: #122D28;
                                        padding: 30px 36px;
                                    ">
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

                                <!-- Content -->
                                <tr>
                                    <td style="
                                        background-color: #FFFFFF;
                                        padding: 36px;
                                    ">

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
                                            line-height: 1.25;
                                        ">
                                            Der er kommet en ny bestilling!
                                        </h1>

                                        <p style="
                                            margin: 0 0 30px;
                                            font-size: 14px;
                                            line-height: 1.7;
                                            color: #777777;
                                        ">
                                            En kunde har sendt en bestilling via vipperbordet.dk.
                                            Her er alle oplysninger.
                                        </p>

                                        <!-- Customer details -->
                                        <h2 style="
                                            margin: 0 0 14px;
                                            color: #122D28;
                                            font-size: 15px;
                                        ">
                                            Virksomhedsoplysninger
                                        </h2>

                                        <table role="presentation" width="100%" cellpadding="0"
                                            cellspacing="0" border="0"
                                            style="font-size: 13px;">

                                            ${[
                                                ["Virksomhed", companyName],
                                                ["Kontaktperson", contactName],
                                                ["E-mail", email],
                                                ["Telefon", phone || "-"]
                                            ].map(([label, value]) => `
                                                <tr>
                                                    <td style="
                                                        padding: 12px 0;
                                                        border-bottom: 1px solid #EAE9E5;
                                                        color: #888888;
                                                        width: 42%;
                                                        vertical-align: top;
                                                    ">${label}</td>

                                                    <td style="
                                                        padding: 12px 0;
                                                        border-bottom: 1px solid #EAE9E5;
                                                        color: #303B37;
                                                        font-weight: bold;
                                                        vertical-align: top;
                                                        word-break: break-word;
                                                    ">${escapeHtml(value)}</td>
                                                </tr>
                                            `).join("")}

                                        </table>

                                        <!-- Product -->
                                        <h2 style="
                                            margin: 30px 0 14px;
                                            color: #122D28;
                                            font-size: 15px;
                                        ">
                                            Produkt
                                        </h2>

                                        <table role="presentation" width="100%" cellpadding="0"
                                            cellspacing="0" border="0"
                                            style="font-size: 13px;">

                                            ${[
                                                ["Tekst på bordkilen", textKilen],
                                                ["Farve", color],
                                                ["Antal", `${quantity} stk.`]
                                            ].map(([label, value]) => `
                                                <tr>
                                                    <td style="
                                                        padding: 12px 0;
                                                        border-bottom: 1px solid #EAE9E5;
                                                        color: #888888;
                                                        width: 42%;
                                                        vertical-align: top;
                                                    ">${label}</td>

                                                    <td style="
                                                        padding: 12px 0;
                                                        border-bottom: 1px solid #EAE9E5;
                                                        color: #303B37;
                                                        font-weight: bold;
                                                        vertical-align: top;
                                                    ">${escapeHtml(value)}</td>
                                                </tr>
                                            `).join("")}

                                        </table>

                                        <!-- Comment -->
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
                                                ${escapeHtml(kommentar || "Ingen kommentar")}
                                            </p>
                                        </div>

                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="
                                        padding: 22px 30px;
                                        background-color: #E9E4DA;
                                        text-align: center;
                                    ">
                                        <p style="
                                            margin: 0;
                                            color: #77736B;
                                            font-size: 11px;
                                            line-height: 1.6;
                                        ">
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