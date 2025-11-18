import prismaClient from "../../prisma";

interface SpeakerRequest {
    name: string;
    bio: string;
    contact?: string;
    photo?: string;
}

class CreateSpeakerService {
    async execute({ name, bio, contact, photo }: SpeakerRequest) {

        if (!name || !bio) {
            throw new Error("Nome e biografia são obrigatórios.");
        }

        const speaker = await prismaClient.speaker.create({
            data: {
                name,
                bio,
                contact: contact ?? null,
                photo: photo ?? null
            },
            select: {
                id: true,
                name: true,
                bio: true,
                contact: true,
                photo: true
            }
        });

        return speaker;
    }
}

export { CreateSpeakerService };
