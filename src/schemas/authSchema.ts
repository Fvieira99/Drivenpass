import Joi from "joi";
import { AuthData } from "../services/authService.js";

const authSchema = Joi.object<AuthData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required()
});

export default authSchema;
