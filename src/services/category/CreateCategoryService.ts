import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {

        if (!name) {
            throw new Error("Nome da categoria é obrigatório.");
        }

        const alreadyExists = await prismaClient.category.findFirst({
            where: { name }
        });

        if (alreadyExists) {
            throw new Error("Categoria já existe.");
        }

        const category = await prismaClient.category.create({
            data: { name }
        });

        return category;
    }
}

export { CreateCategoryService };
