import prisma from "../config/database.js";

import { Wifi } from "@prisma/client";

export type CreateWifiData = Omit<Wifi, "id">;

export async function createWifi(data: CreateWifiData) {
  await prisma.wifi.create({ data });
}

export async function findAllByUserId(userId: number) {
  return await prisma.wifi.findMany({ where: { userId } });
}

export async function findById(id: number) {
  return await prisma.wifi.findUnique({ where: { id } });
}

export async function deleteWifi(id: number) {
  await prisma.wifi.delete({ where: { id } });
}
