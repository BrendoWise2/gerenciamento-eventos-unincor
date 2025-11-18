import { Request, Response } from "express";
import { UpdateSpeakerService } from "../../services/speaker/UpdateSpeakerService";

class UpdateSpeakerController {
    async handle(req: Request, res: Response) {

        const { id, name, bio, contact, photo } = req.body;

        const service = new UpdateSpeakerService();

        const speaker = await service.execute({
            id,
            name,
            bio,
            contact,
            photo
        });

        return res.json(speaker);
    }
}

export { UpdateSpeakerController };
