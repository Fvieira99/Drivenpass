import { Credential_ } from "@prisma/client";
import * as credentialRepository from "../repositories/credentialRepository.js";
import * as serviceUtil from "../utils/serviceUtil.js";

export async function createCredential(
  data: credentialRepository.CreateCredentialData
) {
  const existingCredencial = await credentialRepository.findByTitleAndUserId(
    data.title,
    data.userId
  );
  if (existingCredencial) {
    throw { type: "conflict", message: "Title is already being used" };
  }

  const hashedPassword = serviceUtil.encryptData(data.password);

  await credentialRepository.createCredential({
    ...data,
    password: hashedPassword
  });
}

export async function getAllCredentials(userId: number) {
  const credentials = await credentialRepository.findAllByUserId(userId);
  const decryptedCredentials = decryptMultipleCredentials(credentials);
  return decryptedCredentials;
}

export async function getOneCredential(credentialId: number, userId: number) {
  const credential = await credentialRepository.findById(credentialId);
  if (!credential) {
    throw { type: "not_found", message: "Credential does not exist!" };
  }

  if (credential.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "You are not allowed to see this credential."
    };
  }
  const decryptedPassword = serviceUtil.decryptData(credential.password);

  return { ...credential, password: decryptedPassword };
}

export async function deleteCredential(credentialId: number, userId: number) {
  const credential = await credentialRepository.findById(credentialId);
  if (!credential) {
    throw { type: "not_found", message: "Credential does not exist!" };
  }

  if (credential.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "You are not allowed to delete this credential."
    };
  }

  await credentialRepository.deleteCredential(credentialId);
}

function decryptMultipleCredentials(credentials: Credential_[]) {
  for (let credential of credentials) {
    const encryptedPassword = credential.password;
    credential.password = serviceUtil.decryptData(encryptedPassword);
  }
  return credentials;
}
