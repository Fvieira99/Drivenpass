import { Router } from "express";

const safenoteRouter = Router();

safenoteRouter.post("/safenotes");
safenoteRouter.get("/safenotes");
safenoteRouter.get("/safenotes/safenote/:id");
safenoteRouter.delete("/safenotes/safenote/:id");

export default safenoteRouter;
