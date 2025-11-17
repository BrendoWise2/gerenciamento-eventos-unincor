import { CreateUserService } from '../../services/user/CreateUserService';
import { Request, Response } from 'express';

class CreateUserController {

    async handle(req: Request, res: Response) {

        const { name, email, password, role } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password,
            role
        });

        return res.status(201).json(user);

    }

}

export { CreateUserController }