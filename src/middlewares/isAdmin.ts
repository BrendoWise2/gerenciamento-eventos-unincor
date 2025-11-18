import { Request, Response, NextFunction } from "express";
import prismaClient from "../prisma";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const user_id = req.user_id;

    if (!user_id) {
        return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const user = await prismaClient.user.findFirst({
        where: { id: user_id },
        select: { role: true }
    });

    if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado." });
    }

    if (user.role !== "ADMIN") {
        return res.status(403).json({ error: "Acesso negado. Apenas administradores podem acessar esta rota." });
    }

    return next();
}
