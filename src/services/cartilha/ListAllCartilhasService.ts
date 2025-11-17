import prismaClient from "../../prisma"

const BASE_URL = "http://localhost:3000";

class ListAllCartilhasService {
    async execute() {

        const cartilhas = await prismaClient.cartilha.findMany({
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

        // ✅ Monta a URL completa de imagem e PDF antes de retornar
        return cartilhas.map((c) => ({
            ...c,
            imageCapa: c.imageCapa ? `${BASE_URL}${c.imageCapa}` : null,
            pdf: c.pdf ? `${BASE_URL}${c.pdf}` : null,
        }));

    }


}

export { ListAllCartilhasService }