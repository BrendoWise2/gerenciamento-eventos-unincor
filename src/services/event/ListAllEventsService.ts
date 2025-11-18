import prismaClient from "../../prisma";

class ListAllEventsService {
    async execute() {
        const events = await prismaClient.event.findMany({
            orderBy: { date: "asc" }
        });

        return events;
    }
}

export { ListAllEventsService };
