import bcrypt from "bcrypt";
import prisma from "../../src/config/database.js";
import { faker } from "@faker-js/faker";

const SALT = 10;

export function login(email = "a@dmin.com", passwordLength = 10) {
  const password = faker.internet.password(passwordLength);
  return {
    email,
    password
  };
}

interface Login {
  email: string;
  password: string;
}

export async function createUser(login: Login) {
  const user = await prisma.user.create({
    data: { ...login, password: bcrypt.hashSync(login.password, SALT) }
  });
  return user;
}
