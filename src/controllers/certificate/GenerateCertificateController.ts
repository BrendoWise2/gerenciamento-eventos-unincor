import { Request, Response } from "express";
import { GenerateCertificateService } from "../../services/certificate/GenerateCertificateService";

class GenerateCertificateController {
    async handle(req: Request, res: Response) {
        const { eventId } = req.body;
        const userId = req.user_id; // pelo token

        const service = new GenerateCertificateService();
        const certificate = await service.execute({ userId, eventId });

        return res.status(201).json(certificate);
    }
}

export { GenerateCertificateController };
