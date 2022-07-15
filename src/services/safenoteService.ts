import { Safenote } from "@prisma/client";
import * as safenoteRepository from "../repositories/safenoteRepository.js";

export type CreateSafenoteData = Omit<Safenote, "id" | "userId">;

export async function createSafenote(data: CreateSafenoteData, userId: number) {
  const existingSafenote = await safenoteRepository.findByTitleAndUserId(
    data.title,
    userId
  );
  if (existingSafenote) {
    throw { type: "conflict", message: "Title already exists" };
  }

  await safenoteRepository.createSafenote(data, userId);
}

export async function getAllSafenotes(userId: number) {
  const safenotes = await safenoteRepository.findAllByUserId(userId);
  return safenotes;
}

export async function getOneSafenote(id: number, userId: number) {
  const safenote = await safenoteRepository.findById(id);
  if (!safenote) {
    throw { type: "not_found", message: "Safenote does not exist" };
  }

  if (safenote.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "You are not allowed to see this safenote!"
    };
  }
  return safenote;
}

export async function deleteSafenote(id: number, userId: number) {
  const safenote = await safenoteRepository.findById(id);
  if (!safenote) {
    throw { type: "not_found", message: "Safenote does not exist" };
  }

  if (safenote.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "You are not allowed to delete this safenote!"
    };
  }
  await safenoteRepository.deleteSafenote(id);
}
