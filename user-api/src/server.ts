import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/users.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.listen(3333, () => {
    console.log(`Server rodando em http://localhost:3333`);
}); 

