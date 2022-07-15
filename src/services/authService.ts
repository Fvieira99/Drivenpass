import { User } from "@prisma/client";
import * as authRepository from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const KEY = process.env.JWT_SECRET_KEY;
const CONFIG = { expiresIn: 60 * 60 };

export type AuthData = Omit<User, "id">;

export async function createUser(createUserData: AuthData) {
  const existingUser = await authRepository.findByEmail(createUserData.email);
  if (existingUser) {
    throw { type: "conflict", message: "Email is already being used" };
  }

  const hashedPassword = hashPassword(createUserData.password);

  await authRepository.createUser({
    ...createUserData,
    password: hashedPassword
  });
}

export async function login(loginData: AuthData) {
  const user = await authRepository.findByEmail(loginData.email);
  if (!user || !isCorrectPassword(loginData.password, user.password)) {
    throw { type: "unauthorized", message: "Your credencials are not valid." };
  }

  const data = { userId: user.id };
  const token = jwt.sign(data, KEY, CONFIG);
  return token;
}

function hashPassword(password: string) {
  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(password, SALT);
  return hashedPassword;
}

function isCorrectPassword(inputPassword: string, userPassword: string) {
  const result = bcrypt.compareSync(inputPassword, userPassword);
  return result;
}
