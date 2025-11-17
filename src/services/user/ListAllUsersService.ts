import prismaClient from "../../prisma"


class ListAllUsersService {
    async execute() {

        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                create_at: true,
                update_at: true,
            }
        });

        return users;

    }


}

export { ListAllUsersService }