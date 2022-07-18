import { Safenote } from "@prisma/client";
import * as safenoteRepository from "../repositories/safenoteRepository.js";

export async function createSafenote(
  data: safenoteRepository.CreateSafenoteData
) {
  const existingSafenote = await safenoteRepository.findByTitleAndUserId(
    data.title,
    data.userId
  );
  if (existingSafenote) {
    throw { type: "conflict", message: "Title already exists" };
  }

  await safenoteRepository.createSafenote(data);
}

export async function getAllSafenotes(userId: number) {
  const safenotes = await safenoteRepository.findAllByUserId(userId);
  return safenotes;
}

export async function getOneSafenote(safenoteId: number, userId: number) {
  const safenote = await safenoteRepository.findById(safenoteId);
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

export async function deleteSafenote(safenoteId: number, userId: number) {
  const safenote = await safenoteRepository.findById(safenoteId);
  if (!safenote) {
    throw { type: "not_found", message: "Safenote does not exist" };
  }

  if (safenote.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "You are not allowed to delete this safenote!"
    };
  }
  await safenoteRepository.deleteSafenote(safenoteId);
}
