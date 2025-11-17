import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end(() => console.log("Nao tem token para autorizar"));
    }

    const [, token] = authToken.split(" ");

    try {
        //VALIDAR TOKEN
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        //RECUPERAR ID DO TOKEN E COLOCAR EM UMA ID(USER_ID)
        req.user_id = sub;

        return next();

    } catch (error) {
        return res.status(401).end();
    }


}