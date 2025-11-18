import { Request, Response } from "express";
import { ListSpeakerService } from "../../services/speaker/ListSpeakerService";

class ListSpeakerController {
    async handle(req: Request, res: Response) {
        const id = req.query.id as string;

        const service = new ListSpeakerService();
        const speaker = await service.execute(id);

        return res.json(speaker);
    }
}

export { ListSpeakerController };
