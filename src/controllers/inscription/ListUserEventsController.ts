import { Request, Response } from "express";
import { ListUserEventsService } from "../../services/inscription/ListUserEventsService";

class ListUserEventsController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;

        const service = new ListUserEventsService();
        const result = await service.execute(userId);

        return res.json(result);
    }
}

export { ListUserEventsController };
