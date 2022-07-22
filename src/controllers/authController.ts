import { Request, Response } from "express";
import * as authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
  const createUserData: authService.AuthData = req.body;
  await authService.createUser(createUserData);
  return res.status(201).send("User Created!");
}

export async function signIn(req: Request, res: Response) {
  const loginData: authService.AuthData = req.body;
  const token = await authService.login(loginData);
  return res.status(200).send({ token });
}
