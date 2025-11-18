import prismaClient from "../../prisma";

class ListUserEventsService {
    async execute(userId: string) {

        const events = await prismaClient.inscription.findMany({
            where: { userId },
            include: {
                event: true
            }
        });

        return events.map(e => e.event);
    }
}

export { ListUserEventsService };
