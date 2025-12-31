import { Router, Request, Response } from "express";
import { userSchema } from "../schemas/user.schema";
import { users } from "../data/users";

export const usersRouter = Router();

//Endpoint para novo usuário
usersRouter.post("/", (req: Request, res: Response) => {
    
});