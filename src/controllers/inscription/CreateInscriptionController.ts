import { Request, Response } from "express";
import { CreateInscriptionService } from "../../services/inscription/CreateInscriptionService";

class CreateInscriptionController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id; // pelo auth
        const { eventId } = req.body;

        const service = new CreateInscriptionService();
        const result = await service.execute({ userId, eventId });

        return res.status(201).json(result);
    }
}

export { CreateInscriptionController };
