import prismaClient from "../../prisma";

interface AddRequest {
    eventId: string;
    speakerId: string;
}

class AddSpeakerToEventService {
    async execute({ eventId, speakerId }: AddRequest) {

        if (!eventId || !speakerId) {
            throw new Error("Evento e Palestrante são obrigatórios.");
        }

        // Verificar se evento existe
        const eventExists = await prismaClient.event.findFirst({
            where: { id: eventId }
        });

        if (!eventExists) {
            throw new Error("Evento não encontrado.");
        }

        // Verificar se palestrante existe
        const speakerExists = await prismaClient.speaker.findFirst({
            where: { id: speakerId }
        });

        if (!speakerExists) {
            throw new Error("Palestrante não encontrado.");
        }

        // Verificar se vínculo já existe
        const alreadyLinked = await prismaClient.eventSpeaker.findFirst({
            where: {
                eventId,
                speakerId
            }
        });

        if (alreadyLinked) {
            throw new Error("Este palestrante já está vinculado ao evento.");
        }

        const link = await prismaClient.eventSpeaker.create({
            data: {
                eventId,
                speakerId
            }
        });

        return link;
    }
}

export { AddSpeakerToEventService };
