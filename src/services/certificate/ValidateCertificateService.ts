import prismaClient from "../../prisma";

class ValidateCertificateService {
    async execute(code: string) {

        const cert = await prismaClient.certificate.findFirst({
            where: { code },
            include: {
                user: true,
                event: true
            }
        });

        if (!cert) {
            throw new Error("Certificado inválido.");
        }

        return cert;
    }
}

export { ValidateCertificateService };
