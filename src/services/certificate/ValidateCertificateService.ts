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
            return {
                valid: false,
                message: "Certificado inválido."
            };
        }

        return {
            valid: true,
            message: "Certificado válido.",
            certificateId: cert.id,
            code: cert.code,
            user: {
                name: cert.user.name
            },
            event: {
                title: cert.event.title,
                workload: cert.event.workload,
                date: cert.event.date
            }
        };
    }
}

export { ValidateCertificateService };
