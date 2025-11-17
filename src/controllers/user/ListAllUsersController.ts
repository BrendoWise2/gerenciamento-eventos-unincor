import { ListAllUsersService } from "../../services/user/ListAllUsersService"
import { Request, Response } from "express";


class ListAllUsersController {
    async handle(req: Request, res: Response) {

        const listAllUsersService = new ListAllUsersService();

        const users = await listAllUsersService.execute();

        return res.status(200).json(users);

    }



}

export { ListAllUsersController }