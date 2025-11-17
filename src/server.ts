import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes';
import { resolve } from 'path';
import { error } from 'console';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));

app.use(router);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof Error) {

        console.error("ERRO DE PROCESSAMENTO (400):", err.message);

        return res.status(400).json({
            error: 'Bad Request',
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'Error',
        message: "Internal Service Error"
    });
});

app.listen(3000, () => console.log("Servidor Online"));