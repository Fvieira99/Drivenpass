import Joi from "joi";
import { InputSafenoteData } from "../controllers/safenoteController.js";

const safenoteSchema = Joi.object<InputSafenoteData>({
  note: Joi.string().max(1000).required(),
  title: Joi.string().max(50).required()
});

export default safenoteSchema;
