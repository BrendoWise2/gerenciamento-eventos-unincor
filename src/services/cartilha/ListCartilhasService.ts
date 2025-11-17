import prismaClient from "../../prisma"

interface CartilhaRequest {
    author?: string;
    sort?: string;
    start_with?: string;
}

class ListCartilhasService {
    async execute(params: CartilhaRequest) {

        // 1. Constrói o Objeto WHERE (Filtro)
        const whereCondition: any = {}

        if (params.author) {
            whereCondition.author = params.author;
        }

        if (params.start_with) {
            whereCondition.title = {
                startsWith: params.start_with
            }
        }

        // 2. Constrói o Objeto ORDER BY (Ordenação)
        let orderByCondition: any = {}; // Mantenha como any por enquanto para a dinâmica

        if (params.sort === 'date_desc') {
            orderByCondition = { create_at: 'desc' };
        } else if (params.sort === 'title_desc') {
            orderByCondition = { title: 'desc' };
        } else {
            // Padrão A-Z
            orderByCondition = { title: 'asc' };
        }

        const cartilhas = await prismaClient.cartilha.findMany({
            where: whereCondition,
            orderBy: orderByCondition,
            select: {
                id: true,
                title: true,
                author: true,
                pdf: true,
                imageCapa: true,
                create_at: true,
                update_at: true,
            }
        });

        return cartilhas;

    }


}

export { ListCartilhasService }