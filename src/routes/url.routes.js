import { Router } from "express";
import { deleteURL, getURL, openShortenURL, shortenURL } from "../controllers/url.controller.js";
import { authValidate } from "../middlewares/authValidate.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";

const urlRouter = Router()

urlRouter.post("/urls/shorten", validateSchema(urlSchema), authValidate,shortenURL)
urlRouter.get("/urls/:id", getURL)
urlRouter.get("/urls/open/:shortUrl", openShortenURL)
urlRouter.delete("/urls/:id", deleteURL)

export default urlRouter