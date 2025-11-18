import prismaClient from "../../prisma";

interface InscriptionRequest {
    userId: string;
    eventId: string;
}

class CreateInscriptionService {
    async execute({ userId, eventId }: InscriptionRequest) {

        if (!userId || !eventId) {
            throw new Error("Usuário e evento são obrigatórios.");
        }

        // Verifica evento
        const event = await prismaClient.event.findFirst({
            where: { id: eventId }
        });

        if (!event) {
            throw new Error("Evento não encontrado.");
        }

        // Verifica usuário
        const user = await prismaClient.user.findFirst({
            where: { id: userId }
        });

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        // Verifica duplicidade
        const already = await prismaClient.inscription.findFirst({
            where: { userId, eventId }
        });

        if (already) {
            throw new Error("Usuário já inscrito neste evento.");
        }

        // Verifica vagas
        const count = await prismaClient.inscription.count({
            where: { eventId }
        });

        if (count >= event.vacancies) {
            throw new Error("Não há vagas disponíveis.");
        }

        // Cria inscrição
        const inscription = await prismaClient.inscription.create({
            data: { userId, eventId }
        });

        return inscription;
    }
}

export { CreateInscriptionService };
