import { Request, Response } from "express";
import * as cardService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  const data: cardService.CardInputData = req.body;
  const { userId }: { userId: number } = res.locals.user;
  await cardService.createCard(data, userId);
  res.status(201).send("Created Card");
}

export async function getAllCards(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const cards = await cardService.getAllCards(userId);
  res.send(cards);
}

export async function getOneCard(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const cardId: number = Number(req.params.id);
  const card = await cardService.getOneCard(cardId, userId);
  res.send(card);
}

export async function deleteCard(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const cardId: number = Number(req.params.id);
  await cardService.deleteCard(cardId, userId);
  res.status(204).send("Deleted card");
}
