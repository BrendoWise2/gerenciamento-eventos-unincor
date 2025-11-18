import { Request, Response } from "express";
import { CreateEventService } from "../../services/event/CreateEventService";

class CreateEventController {
    async handle(req: Request, res: Response) {

        const {
            title,
            description,
            banner,
            date,
            location,
            vacancies,
            workload,
            categoryId
        } = req.body;

        const service = new CreateEventService();

        const event = await service.execute({
            title,
            description,
            banner,
            date,
            location,
            vacancies: Number(vacancies),
            workload: Number(workload),
            categoryId
        });

        return res.status(201).json(event);
    }
}

export { CreateEventController };
