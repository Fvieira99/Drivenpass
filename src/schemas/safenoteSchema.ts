import Joi from "joi";
import { CreateSafenoteData } from "../services/safenoteService.js";

const safenoteSchema = Joi.object<CreateSafenoteData>({
  note: Joi.string().max(1000).required(),
  title: Joi.string().max(50).required()
});

export default safenoteSchema;
