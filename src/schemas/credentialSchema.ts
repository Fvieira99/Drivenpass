import Joi from "joi";
import { CreateCredentialData } from "../services/credentialService.js";

const credentialSchema = Joi.object<CreateCredentialData>({
  password: Joi.string().required(),
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  user: Joi.string().required()
});

export default credentialSchema;
