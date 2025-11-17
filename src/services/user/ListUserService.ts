import prismaClient from "../../prisma"

interface UserRequest {
    user_id: string;
}


class ListUserService {
    async execute({ user_id }: UserRequest) {

        const users = await prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
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

export { ListUserService }