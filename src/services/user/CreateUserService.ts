import { Role } from "@prisma/client";
import prismaClient from "../../prisma"
import { hash } from "bcryptjs"
import { sendVerificationEmail } from "../../util/sendVerificationEmail";

interface UserRequest {
    name: string;
    email: string;
    password: string;
    role?: Role;
}


class CreateUserService {
    async execute({ name, email, password, role }: UserRequest) {

        if (!email) {
            throw new Error("Email Incorrect");
        }

        //VERIFICAR PROFESSORES
        /* if (!email.toLowerCase().endsWith("@prof.com.br")) {
             throw new Error("Somente professores podem se cadastrar.");
 
         } */

        const userAlreadyExist = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExist) {
            throw new Error("User already exist");
        }

        const passwordHash = await hash(password, 8);


        const rawToken = Math.random().toString(36).substring(2) + Date.now();
        // token seguro em base64url
        const token = Buffer.from(rawToken, "utf8").toString("base64url");

        //=============FUNCAO PARA FORMATAR NOME===================

        function capitalizeName(name: string) {
            if (!name) return "";

            return name.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
        }

        const formattedName = capitalizeName(name);

        const user = await prismaClient.user.create({
            data: {
                name: formattedName,
                email,
                password: passwordHash,
                role,
                email_verified: false,
                verification_token: token
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                role: true,
                email_verified: true,
            }
        });

        await sendVerificationEmail(email, token);

        return user;

    }


}

export { CreateUserService }