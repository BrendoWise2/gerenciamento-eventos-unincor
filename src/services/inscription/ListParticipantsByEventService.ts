import prismaClient from "../../prisma";

class ListParticipantsByEventService {
    async execute(eventId: string) {

        const participants = await prismaClient.inscription.findMany({
            where: { eventId },
            include: { user: true }
        });

        return participants.map(p => ({
            id: p.user.id,
            name: p.user.name,
            email: p.user.email,
            cpf: p.user.cpf,
            course: p.user.course,
            presence: p.presence
        }));
    }
}

export { ListParticipantsByEventService };
