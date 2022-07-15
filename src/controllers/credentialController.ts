import { Request, Response } from "express";
import * as credentialService from "../services/credentialService.js";

export async function createCredential(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const createCredentialData: credentialService.CreateCredentialData = req.body;

  await credentialService.createCredential(createCredentialData, userId);
  res.sendStatus(201);
}

export async function getAllCredentials(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const credentials = await credentialService.getAllCredentials(userId);
  res.send(credentials);
}

export async function getOneCredential(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const credentialId: number = Number(req.params.id);
  const credential = await credentialService.getOneCredential(
    credentialId,
    userId
  );
  res.send(credential);
}

export async function deleteCredential(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.user;
  const credentialId: number = Number(req.params.id);
  await credentialService.deleteCredential(credentialId, userId);
  res.status(204).send("Credential Deleted!");
}
