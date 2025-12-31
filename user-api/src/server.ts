import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("User API is running");
});

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});