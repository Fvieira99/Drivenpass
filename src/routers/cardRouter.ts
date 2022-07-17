import { Router } from "express";
import {
  createCard,
  getAllCards,
  getOneCard,
  deleteCard
} from "../controllers/cardController.js";

import validateToken from "../middlewares/validateTokenMiddleware.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.use(validateToken);

cardRouter.post("/cards", validateSchema(cardSchema), createCard);
cardRouter.get("/cards", getAllCards);
cardRouter.get("/cards/card/:id", getOneCard);
cardRouter.delete("/cards/card/:id", deleteCard);

export default cardRouter;
