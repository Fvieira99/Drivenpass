import { Credential_ } from "@prisma/client";
import * as credentialRepository from "../repositories/credentialRepository.js";
import dotenv from "dotenv";
dotenv.config();

import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);

export type CreateCredentialData = Omit<Credential_, "id" | "userId">;

export async function createCredential(
  data: CreateCredentialData,
  userId: number
) {
  const existingCredencial = await credentialRepository.findByTitleAndUserId(
    data.title,
    userId
  );
  if (existingCredencial) {
    throw { type: "conflict", message: "Title is already being used" };
  }

  const hashedPassword = encryptPassword(data.password);

  await credentialRepository.createCredential(
    { ...data, password: hashedPassword },
    userId
  );
}

export async function getAllCredentials(userId: number) {
  const credentials = await credentialRepository.findAllByUserId(userId);
  const decryptedCredentials = decryptCredentials(credentials);
  return decryptedCredentials;
}

export async function getOneCredential(id: number, userId: number) {
  const credential = await credentialRepository.findById(id);
  if (!credential) {
    throw { type: "not_found", message: "Credential does not exist!" };
  }

  if (credential.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "You are not allowed to see this credential."
    };
  }
  const decryptedPassword = decryptPassword(credential.password);

  return { ...credential, password: decryptedPassword };
}

export async function deleteCredential(id: number, userId: number) {
  const credential = await credentialRepository.findById(id);
  if (!credential) {
    throw { type: "not_found", message: "Credential does not exist!" };
  }

  if (credential.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "You are not allowed to delete this credential."
    };
  }

  await credentialRepository.deleteCredential(id);
}

function encryptPassword(password: string) {
  const hashedPassword = cryptr.encrypt(password);
  return hashedPassword;
}

function decryptCredentials(credentials: Credential_[]) {
  for (let credential of credentials) {
    const encryptedPassword = credential.password;
    credential.password = decryptPassword(encryptedPassword);
  }
  return credentials;
}

function decryptPassword(password: string) {
  const decryptedPassword = cryptr.decrypt(password);
  return decryptedPassword;
}
