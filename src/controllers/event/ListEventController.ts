import { Request, Response } from "express";
import { ListEventService } from "../../services/event/ListEventService";

class ListEventController {
    async handle(req: Request, res: Response) {
        const eventId = req.query.eventId as string;

        const service = new ListEventService();
        const event = await service.execute(eventId);

        return res.json(event);
    }
}

export { ListEventController };
