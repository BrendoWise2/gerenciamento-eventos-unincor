import { Request, Response } from "express";
import { ListCartilhasService } from "../../services/cartilha/ListCartilhasService";


class ListCartilhasController {
    async handle(req: Request, res: Response) {

        const params = req.query;

        const listCartilhasService = new ListCartilhasService();

        const cartilhas = await listCartilhasService.execute(params);

        return res.status(200).json(cartilhas);

    }

}

export { ListCartilhasController }