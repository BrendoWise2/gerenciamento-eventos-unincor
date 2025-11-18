import prismaClient from "../../prisma";
import { randomUUID } from "crypto";

interface GenerateRequest {
    userId: string;
    eventId: string;
}

class GenerateCertificateService {
    async execute({ userId, eventId }: GenerateRequest) {

        // Verificar inscrição e presença
        const inscription = await prismaClient.inscription.findFirst({
            where: { userId, eventId }
        });

        if (!inscription) {
            throw new Error("Usuário não está inscrito no evento.");
        }

        if (inscription.presence !== "PRESENTE") {
            throw new Error("Certificado só pode ser emitido após presença confirmada.");
        }

        // Verificar se já existe certificado
        const existing = await prismaClient.certificate.findFirst({
            where: { userId, eventId }
        });

        if (existing) {
            return existing; // já existe → retorna ele
        }

        // Criar código único (UUID)
        const code = randomUUID();

        const certificate = await prismaClient.certificate.create({
            data: {
                userId,
                eventId,
                code
            }
        });

        return certificate;
    }
}

export { GenerateCertificateService };
