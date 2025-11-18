import { Request, Response } from "express";
import { DeleteInscriptionService } from "../../services/inscription/DeleteInscriptionService";

class DeleteInscriptionController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;
        const { eventId } = req.body;

        const service = new DeleteInscriptionService();
        const result = await service.execute({ userId, eventId });

        return res.json(result);
    }
}

export { DeleteInscriptionController };
