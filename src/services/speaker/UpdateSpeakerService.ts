import prismaClient from "../../prisma";

interface UpdateRequest {
    id: string;
    name?: string;
    bio?: string;
    contact?: string;
    photo?: string;
}

class UpdateSpeakerService {
    async execute({ id, name, bio, contact, photo }: UpdateRequest) {

        const speakerExists = await prismaClient.speaker.findFirst({
            where: { id }
        });

        if (!speakerExists) {
            throw new Error("Palestrante não encontrado.");
        }

        const speaker = await prismaClient.speaker.update({
            where: { id },
            data: {
                name,
                bio,
                contact,
                photo
            }
        });

        return speaker;
    }
}

export { UpdateSpeakerService };
