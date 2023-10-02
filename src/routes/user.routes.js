import { Router } from "express";
import { getRanking, getUser } from "../controllers/user.controller.js";
import { authValidate } from "../middlewares/authValidate.middleware.js";

const userRouter = Router()

userRouter.get("/users/me", authValidate, getUser)
userRouter.get("/ranking", getRanking)

export default userRouter