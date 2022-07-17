import prisma from "../config/database.js";
import { Card } from "@prisma/client";

export type CreateCardData = Omit<Card, "id">;

export async function createCard(data: CreateCardData) {
  await prisma.card.create({ data });
}

export async function findByTitleAndUserId(title: string, userId: number) {
  return await prisma.card.findFirst({
    where: {
      title,
      userId
    }
  });
}

export async function findAllByUserId(userId: number) {
  return await prisma.card.findMany({
    where: {
      userId
    }
  });
}

export async function findById(id: number) {
  return await prisma.card.findUnique({ where: { id } });
}

export async function deleteCard(id: number) {
  return await prisma.card.delete({ where: { id } });
}
