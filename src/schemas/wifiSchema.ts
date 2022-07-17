import Joi from "joi";
import { InputWifiData } from "../controllers/wifiController.js";

const wifiSchema = Joi.object<InputWifiData>({
  title: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required()
});

export default wifiSchema;
