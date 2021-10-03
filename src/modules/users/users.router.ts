import { Router } from "express";
import { usersController } from ".";
import { makeRoute } from "../../complements/helpers/makeRoute";

const userRouter = Router();

userRouter.get("/", makeRoute(usersController.indexUsers));
userRouter.post("/", makeRoute(usersController.createUser));

export { userRouter };
