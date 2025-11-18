import { Role } from "@prisma/client";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
//import { sendVerificationEmail } from "../../util/sendVerificationEmail";

interface UserRequest {
    name: string;
    email: string;
    password: string;
    role?: Role;
    cpf?: string;
    birthDate?: string;
    phone?: string;
    course?: string;
}

class CreateUserService {
    async execute({ name, email, password, role, cpf, birthDate, phone, course }: UserRequest) {

        if (!email) {
            throw new Error("Email inválido.");
        }

        // Verificar se já existe
        const userAlreadyExist = await prismaClient.user.findFirst({
            where: { email }
        });

        if (userAlreadyExist) {
            throw new Error("Usuário já existe.");
        }

        // Hash da senha
        const passwordHash = await hash(password, 8);

        // Gerar token seguro
        const rawToken = Math.random().toString(36).substring(2) + Date.now();
        const token = Buffer.from(rawToken, "utf8").toString("base64url");

        // Função para formatar nome
        function capitalizeName(name: string) {
            if (!name) return "";
            return name
                .trim()
                .split(/\s+/)
                .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(" ");
        }

        const formattedName = capitalizeName(name);

        const user = await prismaClient.user.create({
            data: {
                name: formattedName,
                email,
                password: passwordHash,
                role: role ?? "PARTICIPANTE",
                cpf: cpf ?? null,
                phone: phone ?? null,
                course: course ?? null,
                birthDate: birthDate ? new Date(birthDate) : null,
                //  email_verified: false,
                // verification_token: token
            },
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
                phone: true,
                course: true,
                role: true,
                //   email_verified: true
            }
        });

        //  await sendVerificationEmail(email, token);

        return user;
    }
}

export { CreateUserService };
