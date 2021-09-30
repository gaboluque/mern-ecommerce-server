import { Router } from "express";
import { usersController } from ".";
import { makeRoute } from "../../complements/helpers/makeRoutesController";

const userRouter = Router();

userRouter.get("/", makeRoute(usersController.getUsers));

export { userRouter };
