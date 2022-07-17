import Joi from "joi";
import { InputCredentialData } from "../controllers/credentialController.js";

const credentialSchema = Joi.object<InputCredentialData>({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  user: Joi.string().required(),
  password: Joi.string().required()
});

export default credentialSchema;
