import prismaClient from "../../prisma";

class DeleteSpeakerService {
    async execute(id: string) {

        const speakerExists = await prismaClient.speaker.findFirst({
            where: { id }
        });

        if (!speakerExists) {
            throw new Error("Palestrante não encontrado.");
        }

        const deleted = await prismaClient.speaker.delete({
            where: { id }
        });

        return { message: "Palestrante deletado com sucesso.", deleted };
    }
}

export { DeleteSpeakerService };
