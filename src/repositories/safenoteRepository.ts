import prisma from "../config/database.js";
import { CreateSafenoteData } from "../services/safenoteService.js";

export async function createSafenote(data: CreateSafenoteData, userId: number) {
  await prisma.safenote.create({ data: { ...data, userId } });
}

export async function findByTitleAndUserId(title: string, userId: number) {
  const safenote = await prisma.safenote.findMany({
    where: {
      title,
      userId
    }
  });
  return safenote[0];
}

export async function findAllByUserId(userId: number) {
  return await prisma.safenote.findMany({ where: { userId } });
}

export async function findById(id: number) {
  return await prisma.safenote.findUnique({ where: { id } });
}

export async function deleteSafenote(id: number) {
  await prisma.safenote.delete({ where: { id } });
}
