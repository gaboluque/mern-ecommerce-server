import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorHandler } from "./complements/helpers/errorHandler";
import { userRouter } from "./modules/users/users.router";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(helmet());
app.use(cors());
app.options("*", cors);

app.use("/users", userRouter);

app.use(errorHandler);

app.listen(9090, () => console.log(`Listening on port 9090`));

export { app };
