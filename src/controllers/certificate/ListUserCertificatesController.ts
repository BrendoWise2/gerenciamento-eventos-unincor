import { Request, Response } from "express";
import { ListUserCertificatesService } from "../../services/certificate/ListUserCertificatesService";

class ListUserCertificatesController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;

        const service = new ListUserCertificatesService();
        const result = await service.execute(userId);

        return res.json(result);
    }
}

export { ListUserCertificatesController };
