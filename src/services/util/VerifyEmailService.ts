import prismaClient from "../../prisma";

interface VerifyEmailRequest {
    token: string;
}

export class VerifyEmailService {
    async execute({ token }: VerifyEmailRequest) {

        console.log("TOKEN BASE64URL RECEBIDO:", token);

        const user = await prismaClient.user.findFirst({
            where: { verification_token: token },
        });

        console.log("USUÁRIO ENCONTRADO:", user);

        if (!user) {
            throw new Error("Token inválido ou expirado");
        }

        await prismaClient.user.update({
            where: { id: user.id },
            data: {
                email_verified: true,
                verification_token: null
            }
        });

        return { message: "E-mail verificado!" };
    }
}
