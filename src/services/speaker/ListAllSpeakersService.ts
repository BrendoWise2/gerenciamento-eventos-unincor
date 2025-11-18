import prismaClient from "../../prisma";

class ListAllSpeakersService {
    async execute() {
        return await prismaClient.speaker.findMany();
    }
}

export { ListAllSpeakersService }
