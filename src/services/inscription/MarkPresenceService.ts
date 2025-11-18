import prismaClient from "../../prisma";
import { PresencaStatus } from "@prisma/client";

interface PresenceRequest {
    userId: string;
    eventId: string;
}

class MarkPresenceService {
    async execute({ userId, eventId }: PresenceRequest) {

        const inscription = await prismaClient.inscription.findFirst({
            where: { userId, eventId }
        });

        if (!inscription) {
            throw new Error("Inscrição não encontrada.");
        }

        const updated = await prismaClient.inscription.update({
            where: { id: inscription.id },
            data: {
                presence: PresencaStatus.PRESENTE
            }
        });

        return updated;
    }
}

export { MarkPresenceService };
