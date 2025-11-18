import { AuthUserService } from "../../services/user/AuthUserService";
import { Request, Response } from "express";

class AuthUserController {
    async handle(req: Request, res: Response) {

        const { cpf, password } = req.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute({
            cpf,
            password,
        });

        return res.status(200).json(auth);
    }
}

export { AuthUserController };
