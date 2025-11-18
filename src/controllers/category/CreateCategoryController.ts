import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;

        const service = new CreateCategoryService();
        const category = await service.execute({ name });

        return res.status(201).json(category);
    }
}

export { CreateCategoryController };
