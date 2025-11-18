import prismaClient from "../../prisma";

class ListSpeakersByEventService {
    async execute(eventId: string) {

        const speakers = await prismaClient.eventSpeaker.findMany({
            where: { eventId },
            include: {
                speaker: true
            }
        });

        return speakers.map(s => s.speaker);
    }
}

export { ListSpeakersByEventService };
