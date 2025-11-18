import prismaClient from "../../prisma";

class DeleteEventService {
    async execute(eventId: string) {

        const eventExists = await prismaClient.event.findFirst({
            where: { id: eventId }
        });

        if (!eventExists) {
            throw new Error("Evento não encontrado.");
        }

        const deleted = await prismaClient.event.delete({
            where: { id: eventId }
        });

        return { message: "Evento deletado com sucesso.", deleted };
    }
}

export { DeleteEventService };
