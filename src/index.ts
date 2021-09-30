import cors from "cors";
import express from "express";
import helmet from "helmet";
import { userRouter } from "./modules/users/users.router";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(helmet());
app.use(cors());
app.options("*", cors);

app.use("/users", userRouter);

app.listen(9090, () => console.log(`Listening on port 9090`));
