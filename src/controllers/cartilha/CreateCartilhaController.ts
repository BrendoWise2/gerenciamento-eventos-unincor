import { Request, Response } from "express"
import { CreateCartilhaService } from "../../services/cartilha/CreateCartilhaService"

const BASE_URL = "http://localhost:3000";


class CreateCartilhaController {
    async handle(req: Request, res: Response) {

        const { title, author } = req.body;

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const pdfFile = files?.pdfFile?.[0];
        const imageFile = files?.imageFile?.[0];

        // 3. DADOS DO USUÁRIO (injetado pelo isAuthenticated middleware)
        const userId = (req as any).userId as string;

        if (!title || !author || !pdfFile) {
            return res.status(400).json({ error: 'Dados incompletos. Título, autor e arquivo PDF são obrigatórios.' })
        }

        // Descobre a subpasta real do arquivo
        const pdfFolder = pdfFile.destination.split("uploads")[1]; // ex: "\pdfs"
        const imageFolder = imageFile ? imageFile.destination.split("uploads")[1] : "";

        // normaliza as barras invertidas para "/"
        const normalizePath = (path: string) => path.replace(/\\/g, "/");

        const urlPdf = normalizePath(`/uploads${pdfFolder}/${pdfFile.filename}`);
        const urlCapa = imageFile
            ? normalizePath(`/uploads${imageFolder}/${imageFile.filename}`)
            : "/uploads/default-capa.png";



        const createCartilhaService = new CreateCartilhaService();


        const cartilha = await createCartilhaService.execute({
            title,
            author,
            pdf: urlPdf,
            imageCapa: urlCapa,
            userId
        });

        const fullCartilha = {
            ...cartilha,
            pdf: `${BASE_URL}${cartilha.pdf}`,
            imageCapa: `${BASE_URL}${cartilha.imageCapa}`,
        };

        return res.status(201).json(fullCartilha);

    }


}

export { CreateCartilhaController }