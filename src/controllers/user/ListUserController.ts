import { Request, Response } from "express";
import { ListUserService } from "../../services/user/ListUserService";


class ListUserController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;

        const listUserService = new ListUserService();

        const users = await listUserService.execute({
            user_id
        });

        return res.status(200).json(users);

    }



}

export { ListUserController }