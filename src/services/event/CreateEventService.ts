import prismaClient from "../../prisma";

interface EventRequest {
    title: string;
    description: string;
    banner?: string;
    date: string;
    location: string;
    vacancies: number;
    workload: number;
    categoryId: string; // ID da categoria
}

class CreateEventService {
    async execute({
        title,
        description,
        banner,
        date,
        location,
        vacancies,
        workload,
        categoryId
    }: EventRequest) {

        if (!title || !description || !date || !location || !categoryId) {
            throw new Error("Preencha todos os campos obrigatórios.");
        }

        // Verificar categoria
        const categoryExists = await prismaClient.category.findFirst({
            where: { id: categoryId }
        });

        if (!categoryExists) {
            throw new Error("Categoria não encontrada.");
        }

        const event = await prismaClient.event.create({
            data: {
                title,
                description,
                banner: banner ?? null,
                date: new Date(date),
                location,
                vacancies,
                workload,
                category: {
                    connect: { id: categoryId }
                }
            },
            select: {
                id: true,
                title: true,
                description: true,
                banner: true,
                date: true,
                location: true,
                vacancies: true,
                workload: true,
                category: true
            }
        });

        return event;
    }
}

export { CreateEventService };
