import { Request, Response } from "express";
import { GenerateAllCertificatesService } from "../../services/certificate/GenerateAllCertificatesService";

class GenerateAllCertificatesController {
    async handle(req: Request, res: Response) {
        const { eventId } = req.body;

        const service = new GenerateAllCertificatesService();
        const list = await service.execute({ eventId });

        return res.json(list);
    }
}

export { GenerateAllCertificatesController };
