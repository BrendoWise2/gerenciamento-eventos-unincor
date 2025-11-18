import prismaClient from "../../prisma";
import { randomUUID } from "crypto";

interface RequestData {
    eventId: string;
}

class GenerateAllCertificatesService {
    async execute({ eventId }: RequestData) {

        // Buscar todos os que estavam presentes
        const inscriptions = await prismaClient.inscription.findMany({
            where: {
                eventId,
                presence: "PRESENTE"
            }
        });

        const results = [];

        for (const ins of inscriptions) {
            const exists = await prismaClient.certificate.findFirst({
                where: {
                    userId: ins.userId,
                    eventId
                }
            });

            if (exists) {
                results.push(exists);
                continue;
            }

            const cert = await prismaClient.certificate.create({
                data: {
                    userId: ins.userId,
                    eventId,
                    code: randomUUID()
                }
            });

            results.push(cert);
        }

        return results;
    }
}

export { GenerateAllCertificatesService };
