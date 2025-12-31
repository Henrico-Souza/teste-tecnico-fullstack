import { Router, Request, Response } from "express";
import { userSchema } from "../schemas/user.schema";
import { users } from "../data/users";

export const usersRouter = Router();

//Endpoint para novo usuário
usersRouter.post("/", (req: Request, res: Response) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.format(),
        })
    }

    //Verifica se o email já está cadastrado
    const existingUser = users.find(user => user.email === result.data.email);
    if (existingUser) {
        return res.status(409).json({ message: "Email já cadastrado." });
    }

    users.push(result.data);
    return res.status(201).json(result.data);
});

usersRouter.get("/", (req: Request, res: Response) => {
    return res.json(users);
});

