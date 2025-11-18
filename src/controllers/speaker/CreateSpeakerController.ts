import { Request, Response } from "express";
import { CreateSpeakerService } from "../../services/speaker/CreateSpeakerService";

class CreateSpeakerController {
    async handle(req: Request, res: Response) {

        const { name, bio, contact, photo } = req.body;

        const service = new CreateSpeakerService();

        const speaker = await service.execute({
            name,
            bio,
            contact,
            photo
        });

        return res.status(201).json(speaker);
    }
}

export { CreateSpeakerController };
