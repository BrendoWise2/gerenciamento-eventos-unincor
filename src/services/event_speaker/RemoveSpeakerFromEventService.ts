import prismaClient from "../../prisma";

interface RemoveRequest {
    eventId: string;
    speakerId: string;
}

class RemoveSpeakerFromEventService {
    async execute({ eventId, speakerId }: RemoveRequest) {

        const link = await prismaClient.eventSpeaker.findFirst({
            where: { eventId, speakerId }
        });

        if (!link) {
            throw new Error("Palestrante não está vinculado ao evento.");
        }

        await prismaClient.eventSpeaker.delete({
            where: { id: link.id }
        });

        return { message: "Palestrante removido do evento com sucesso." };
    }
}

export { RemoveSpeakerFromEventService };
