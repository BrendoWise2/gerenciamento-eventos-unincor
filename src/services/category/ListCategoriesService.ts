import prismaClient from "../../prisma";

class ListCategoriesService {
    async execute() {
        return await prismaClient.category.findMany();
    }
}

export { ListCategoriesService };
