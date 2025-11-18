import { Request, Response } from "express";
import { DeleteEventService } from "../../services/event/DeleteEventService";

class DeleteEventController {
    async handle(req: Request, res: Response) {
        const eventId = req.query.eventId as string;

        const service = new DeleteEventService();
        const result = await service.execute(eventId);

        return res.status(204).json(result);
    }
}

export { DeleteEventController };
