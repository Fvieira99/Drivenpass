import { Router } from "express";
import {
  createSafenote,
  deleteSafenote,
  getAllSafenotes,
  getOneSafenote
} from "../controllers/safenoteController.js";

import validateToken from "../middlewares/validateTokenMiddleware.js";

const safenoteRouter = Router();

safenoteRouter.use(validateToken);

safenoteRouter.post("/safenotes", createSafenote);
safenoteRouter.get("/safenotes", getAllSafenotes);
safenoteRouter.get("/safenotes/safenote/:id", getOneSafenote);
safenoteRouter.delete("/safenotes/safenote/:id", deleteSafenote);

export default safenoteRouter;
