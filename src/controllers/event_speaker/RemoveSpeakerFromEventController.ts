import { Request, Response } from "express";
import { RemoveSpeakerFromEventService } from "../../services/event_speaker/RemoveSpeakerFromEventService";


class RemoveSpeakerFromEventController {
    async handle(req: Request, res: Response) {
        const { eventId, speakerId } = req.body;

        const service = new RemoveSpeakerFromEventService();
        const result = await service.execute({ eventId, speakerId });

        return res.json(result);
    }
}

export { RemoveSpeakerFromEventController };
