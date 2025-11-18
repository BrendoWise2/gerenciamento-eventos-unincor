import { Request, Response } from "express";
import { ListCategoriesService } from "../../services/category/ListCategoriesService";

class ListCategoriesController {
    async handle(req: Request, res: Response) {
        const service = new ListCategoriesService();
        const categories = await service.execute();
        return res.json(categories);
    }
}

export { ListCategoriesController };
