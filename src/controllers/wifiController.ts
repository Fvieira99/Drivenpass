import { Request, Response } from "express";
import { CreateWifiData } from "../repositories/wifiRepository.js";
import * as wifiService from "../services/wifiService.js";

export type InputWifiData = Omit<CreateWifiData, "userId">;

export async function createWifi(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const data: InputWifiData = req.body;
  await wifiService.createWifi({ ...data, userId });
  res.status(201).send("Created Wifi!");
}

export async function getAllWifis(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const wifis = await wifiService.getAllWifis(userId);
  res.send(wifis);
}

export async function getOneWifi(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const wifiId: number = Number(req.params.id);
  const wifi = await wifiService.getOneWifi(wifiId, userId);
  res.send(wifi);
}

export async function deleteWifi(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const wifiId: number = Number(req.params.id);
  await wifiService.deleteWifi(wifiId, userId);
  res.status(204).send("Deleted Wifi!");
}
