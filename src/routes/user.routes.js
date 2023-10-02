import { Router } from "express";
import { getRanking, getUser } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.get("/users/me", getUser)
userRouter.get("/ranking", getRanking)

export default userRouter