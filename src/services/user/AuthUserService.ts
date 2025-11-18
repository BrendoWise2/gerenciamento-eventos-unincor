import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken"


interface AuthRequest {
    email: string;
    password: string;
}


class AuthUserService {
    async execute({ email, password }: AuthRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("User/Password incorrect");
        }

        //  if (!user.email_verified) {
        //      throw new Error("E-mail não verificado. Verifique sua caixa de entrada.");
        //  }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("User/Password incorrect");
        }

        //GERAR TOKEN JWT E DEVOLVER OS DADOS DO USUARIO COMO ID,NAME...
        const token = sign({
            name: user.name,
            email: user.email
        },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }

    }

}

export { AuthUserService }