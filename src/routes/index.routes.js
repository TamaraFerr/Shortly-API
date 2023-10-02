import { Router } from "express";
import authRouter from "./auth.routes.js"
import userRouter from "./user.routes.js"
import urlRouter from "./url.routes.js"

const router = Router()

router.use(authRouter)
router.use(urlRouter)
router.use(userRouter)

export default router
