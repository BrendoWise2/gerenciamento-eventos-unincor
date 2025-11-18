import { Request, Response } from "express";
import { MarkPresenceService } from "../../services/inscription/MarkPresenceService";

class MarkPresenceController {
    async handle(req: Request, res: Response) {

        const { userId, eventId } = req.body;

        const service = new MarkPresenceService();
        const result = await service.execute({ userId, eventId });

        return res.json(result);
    }
}

export { MarkPresenceController };
