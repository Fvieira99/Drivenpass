import prisma from "../config/database.js";
import { Credential_ } from "@prisma/client";

export type CreateCredentialData = Omit<Credential_, "id">;

export async function createCredential(data: CreateCredentialData) {
  await prisma.credential_.create({
    data
  });
}

export async function findByTitleAndUserId(title: string, userId: number) {
  return await prisma.credential_.findFirst({
    where: { userId, title }
  });
}

export async function findAllByUserId(userId: number) {
  return await prisma.credential_.findMany({ where: { userId } });
}

export async function findById(id: number) {
  return await prisma.credential_.findUnique({ where: { id } });
}

export async function deleteCredential(id: number) {
  await prisma.credential_.delete({ where: { id } });
}
