import prismaClient from "../../prisma";

class ListEventService {
    async execute(eventId: string) {
        const event = await prismaClient.event.findFirst({
            where: { id: eventId }
        });

        if (!event) {
            throw new Error("Evento não encontrado.");
        }

        return event;
    }
}

export { ListEventService };
