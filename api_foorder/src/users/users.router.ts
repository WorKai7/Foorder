import { Router } from "express";
import { getUsers } from "./users.controller.js";

export const userRouter = Router();

userRouter.get("/", getUsers)