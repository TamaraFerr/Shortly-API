import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { authSchema } from "../schemas/auth.schema.js";
import { userSchema } from "../schemas/user.schema.js";

const authRouter = Router()

authRouter.post("/signup", validateSchema(userSchema) ,signUp)
authRouter.post("/signin", validateSchema(authSchema), signIn)

export default authRouter