import { Router } from "express";
import {
  createSafenote,
  deleteSafenote,
  getAllSafenotes,
  getOneSafenote
} from "../controllers/safenoteController.js";

import safenoteSchema from "../schemas/safenoteSchema.js";
import validateToken from "../middlewares/validateTokenMiddleware.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";

const safenoteRouter = Router();

safenoteRouter.use(validateToken);

safenoteRouter.post(
  "/safenotes",
  validateSchema(safenoteSchema),
  createSafenote
);
safenoteRouter.get("/safenotes", getAllSafenotes);
safenoteRouter.get("/safenotes/safenote/:id", getOneSafenote);
safenoteRouter.delete("/safenotes/safenote/:id", deleteSafenote);

export default safenoteRouter;
