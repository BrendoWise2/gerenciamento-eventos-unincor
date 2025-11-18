import { Request, Response } from "express";
import { ListAllSpeakersService } from "../../services/speaker/ListAllSpeakersService";

class ListAllSpeakersController {
    async handle(req: Request, res: Response) {
        const service = new ListAllSpeakersService();
        const speakers = await service.execute();
        return res.json(speakers);
    }
}

export { ListAllSpeakersController };
