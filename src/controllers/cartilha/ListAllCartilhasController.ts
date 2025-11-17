import { ListAllCartilhasService } from "../../services/cartilha/ListAllCartilhasService";
import { Request, Response } from "express";

const BASE_URL = "http://localhost:3000";

class ListAllCartilhasController {
    async handle(req: Request, res: Response) {

        const listAllCartilhasService = new ListAllCartilhasService();

        const cartilhas = await listAllCartilhasService.execute();

        return res.status(200).json(cartilhas);

    }



}

export { ListAllCartilhasController }