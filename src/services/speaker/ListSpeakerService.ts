import prismaClient from "../../prisma";

class ListSpeakerService {
    async execute(id: string) {

        const speaker = await prismaClient.speaker.findFirst({
            where: { id }
        });

        if (!speaker) {
            throw new Error("Palestrante não encontrado.");
        }

        return speaker;
    }
}

export { ListSpeakerService };
