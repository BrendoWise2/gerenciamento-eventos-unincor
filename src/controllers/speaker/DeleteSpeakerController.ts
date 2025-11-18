import { Request, Response } from "express";
import { DeleteSpeakerService } from "../../services/speaker/DeleteSpeakerService";

class DeleteSpeakerController {
    async handle(req: Request, res: Response) {

        const id = req.query.id as string;

        const service = new DeleteSpeakerService();
        const result = await service.execute(id);

        return res.status(204).json(result);
    }
}

export { DeleteSpeakerController };
