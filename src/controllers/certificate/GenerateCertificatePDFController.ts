import { Request, Response } from "express";
import { GenerateCertificatePDFService } from "../../services/certificate/GenerateCertificatePDFService";

class GenerateCertificatePDFController {
    async handle(req: Request, res: Response) {
        const { certificateId } = req.body;

        const service = new GenerateCertificatePDFService();
        const result = await service.execute({ certificateId });

        return res.json(result);
    }
}

export { GenerateCertificatePDFController };
