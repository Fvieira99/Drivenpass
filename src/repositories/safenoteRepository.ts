import prisma from "../config/database.js";
import { Safenote } from "@prisma/client";

export type CreateSafenoteData = Omit<Safenote, "id">;

export async function createSafenote(data: CreateSafenoteData) {
  await prisma.safenote.create({ data });
}

export async function findByTitleAndUserId(title: string, userId: number) {
  return await prisma.safenote.findFirst({
    where: {
      title,
      userId
    }
  });
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
