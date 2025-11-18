import { Request, Response } from "express";
import { ValidateCertificateService } from "../../services/certificate/ValidateCertificateService";

class ValidateCertificateController {
    async handle(req: Request, res: Response) {
        const code = req.query.code as string;

        const service = new ValidateCertificateService();
        const result = await service.execute(code);

        return res.json(result);
    }
}

export { ValidateCertificateController };
