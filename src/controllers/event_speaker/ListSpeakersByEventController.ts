import { Request, Response } from "express";
import { ListSpeakersByEventService } from "../../services/event_speaker/ListSpeakersByEventService";


class ListSpeakersByEventController {
    async handle(req: Request, res: Response) {
        const eventId = req.query.eventId as string;

        const service = new ListSpeakersByEventService();
        const result = await service.execute(eventId);

        return res.json(result);
    }
}

export { ListSpeakersByEventController };
