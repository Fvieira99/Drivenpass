import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import authSchema from "../schemas/authSchema.js";

const authRouter = Router();
authRouter.use(validateSchema(authSchema));

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);

export default authRouter;
