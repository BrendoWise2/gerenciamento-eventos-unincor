import prismaClient from "../../prisma";

interface CartilhaRequest {
    title: string;
    author: string;
    pdf: string;
    imageCapa?: string;
    userId: string
}


class CreateCartilhaService {
    async execute({ title, author, pdf, imageCapa, userId }: CartilhaRequest) {

        //DEIXAR A PRIMEIRA LETRA MAIUSCULA DO AUTOR
        function capitalizeName(name: string) {
            if (!name) return "";
            return name
                .trim()
                .split(/\s+/) // divide por 1+ espaços
                .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(" ");
        }

        const formattedAuthor = capitalizeName(author);
        const formattedTitle = capitalizeName(title);


        const cartilha = await prismaClient.cartilha.create({
            data: {
                title: formattedTitle,
                author: formattedAuthor,
                pdf: pdf,
                imageCapa: imageCapa,
                userId: userId,
            }
        });

        return cartilha;
    }

}

export { CreateCartilhaService }