import { Request, Response } from "express";
import { AddSpeakerToEventService } from "../../services/event_speaker/AddSpeakerToEventService";


class AddSpeakerToEventController {
    async handle(req: Request, res: Response) {
        const { eventId, speakerId } = req.body;

        const service = new AddSpeakerToEventService();
        const result = await service.execute({ eventId, speakerId });

        return res.status(201).json(result);
    }
}

export { AddSpeakerToEventController };
