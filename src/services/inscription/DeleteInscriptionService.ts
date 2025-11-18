import prismaClient from "../../prisma";

interface DeleteRequest {
    userId: string;
    eventId: string;
}

class DeleteInscriptionService {
    async execute({ userId, eventId }: DeleteRequest) {

        const inscription = await prismaClient.inscription.findFirst({
            where: { userId, eventId }
        });

        if (!inscription) {
            throw new Error("Inscrição não encontrada.");
        }

        await prismaClient.inscription.delete({
            where: { id: inscription.id }
        });

        return { message: "Inscrição cancelada com sucesso." };
    }
}

export { DeleteInscriptionService };
