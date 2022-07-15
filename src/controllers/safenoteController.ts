import { Request, Response } from "express";
import * as safenoteService from "../services/safenoteService.js";

export async function createSafenote(req: Request, res: Response) {
  const data: safenoteService.CreateSafenoteData = req.body;
  const { userId }: { userId: number } = res.locals.user;
  await safenoteService.createSafenote(data, userId);
  res.status(201).send("Created safenote!");
}

export async function getAllSafenotes(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const safenotes = await safenoteService.getAllSafenotes(userId);
  res.send(safenotes);
}

export async function getOneSafenote(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const safenoteId: number = Number(req.params.id);
  const safenote = await safenoteService.getOneSafenote(safenoteId, userId);
  res.send(safenote);
}

export async function deleteSafenote(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const safenoteId: number = Number(req.params.id);
  await safenoteService.deleteSafenote(safenoteId, userId);
  res.status(204).send("Deleted");
}
