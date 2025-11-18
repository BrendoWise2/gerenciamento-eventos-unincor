import { Request, Response } from "express";
import { ListParticipantsByEventService } from "../../services/inscription/ListParticipantsByEventService";

class ListParticipantsByEventController {
    async handle(req: Request, res: Response) {
        const eventId = req.query.eventId as string;

        const service = new ListParticipantsByEventService();
        const result = await service.execute(eventId);

        return res.json(result);
    }
}

export { ListParticipantsByEventController };
