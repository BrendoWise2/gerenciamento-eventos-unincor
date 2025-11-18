import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    cpf: string;
    password: string;
}

class AuthUserService {
    async execute({ cpf, password }: AuthRequest) {

        if (!cpf) {
            throw new Error("CPF é obrigatório.");
        }

        const user = await prismaClient.user.findFirst({
            where: { cpf }
        });

        if (!user) {
            throw new Error("CPF ou senha incorretos.");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("CPF ou senha incorretos.");
        }

        // TOKEN
        const token = sign(
            {
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET!,
            {
                subject: user.id,
                expiresIn: "30d"
            }
        );

        return {
            id: user.id,
            name: user.name,
            role: user.role,
            token
        };
    }
}

export { AuthUserService };
