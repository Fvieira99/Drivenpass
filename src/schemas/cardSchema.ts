import Joi from "joi";
import { InputCardData } from "../controllers/cardController.js";

const CARD_NUMBER_PATTERN = /^[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/;

const CARD_EXPDATE_PATTERN = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;

const CARD_PASSWORD_PATTERN = /^[0-9]{4}$/;

const CARD_CVV_PATTERN = /^[0-9]{3}$/;

const cardSchema = Joi.object<InputCardData>({
  title: Joi.string().required(),
  cardNumber: Joi.string().pattern(CARD_NUMBER_PATTERN).required(),
  securityCode: Joi.string().pattern(CARD_CVV_PATTERN),
  password: Joi.string().pattern(CARD_PASSWORD_PATTERN),
  expirationDate: Joi.string().pattern(CARD_EXPDATE_PATTERN),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().valid("credit", "debit", "credit/debit").required()
});

export default cardSchema;
