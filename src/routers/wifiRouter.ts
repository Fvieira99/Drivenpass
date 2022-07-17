import { Router } from "express";
import {
  createWifi,
  getAllWifis,
  getOneWifi,
  deleteWifi
} from "../controllers/wifiController.js";
import wifiSchema from "../schemas/wifiSchema.js";
import validateToken from "../middlewares/validateTokenMiddleware.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";

const wifiRouter = Router();

wifiRouter.use(validateToken);

wifiRouter.post("/wifis", validateSchema(wifiSchema), createWifi);
wifiRouter.get("/wifis", getAllWifis);
wifiRouter.get("/wifis/wifi/:id", getOneWifi);
wifiRouter.delete("/wifis/wifi/:id", deleteWifi);

export default wifiRouter;
