import { Request, Response } from "express";
import { ListAllEventsService } from "../../services/event/ListAllEventsService";

class ListAllEventsController {
    async handle(req: Request, res: Response) {
        const listAllEventsService = new ListAllEventsService();
        const events = await listAllEventsService.execute();
        return res.json(events);
    }
}

export { ListAllEventsController };
