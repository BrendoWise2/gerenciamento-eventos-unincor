import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, token: string) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const verifyUrl = `${process.env.SERVER_URL}/verify-email?token=${token}`;

        const info = await transporter.sendMail({
            from: `"UninCor" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Confirme seu e-mail - UninCor - Cartilha",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #00df82;">Verifique seu e-mail</h2>
                    <p>Clique no botão abaixo para ativar sua conta:</p>

                    <a href="${verifyUrl}"
                       style="display:inline-block;margin-top:20px;padding:10px 20px;background:#00df82;color:#fff;border-radius:6px;text-decoration:none;font-weight:bold;">
                       ✔ Verificar E-mail
                    </a>

                    <p style="margin-top:20px;">Se você não fez esse cadastro, ignore este e-mail.</p>
                </div>
            `,
        });

        console.log("📧 E-mail REAL enviado com sucesso!", info.messageId);

    } catch (error: any) {
        console.error("❌ Erro ao enviar e-mail real:", error.message);
        throw new Error("Falha ao enviar e-mail de verificação");
    }
}
