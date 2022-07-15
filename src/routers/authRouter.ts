import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import authSchema from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(authSchema), signUp);
authRouter.post("/signin", validateSchema(authSchema), signIn);

export default authRouter;
