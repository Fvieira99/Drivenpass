import prisma from "../config/database.js";
import { CreateCredentialData } from "../services/credentialService.js";

export async function createCredential(
  createCredentialData: CreateCredentialData,
  userId: number
) {
  await prisma.credential_.create({
    data: { ...createCredentialData, userId }
  });
}

export async function findByTitleAndUserId(title: string, userId: number) {
  const credentials = await prisma.credential_.findMany({
    where: { userId, title }
  });
  return credentials[0];
}

export async function findByUserId(userId: number) {
  const credentials = await prisma.credential_.findMany({ where: { userId } });
  return credentials;
}

export async function findById(id: number) {
  const credential = await prisma.credential_.findUnique({ where: { id } });
  return credential;
}

export async function deleteCredential(id: number) {
  await prisma.credential_.delete({ where: { id } });
}
