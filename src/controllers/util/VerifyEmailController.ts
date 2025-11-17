import { Request, Response } from "express";
import { VerifyEmailService } from "../../services/util/VerifyEmailService";

export class VerifyEmailController {
    async handle(req: Request, res: Response) {
        const token = req.query.token as string;

        if (!token) {
            return res.status(400).json({ error: "Token não informado" });
        }

        const verifyEmailService = new VerifyEmailService;
        await verifyEmailService.execute({ token });

        console.log("TOKEN RECEBIDO NA URL:", token);


        return res.send(`
            <h1 style="font-family:Arial; color:#00df82;">
                ✔ E-mail verificado com sucesso!
            </h1>
            <p>Agora você já pode fazer login.</p>
        `);
    }
}
