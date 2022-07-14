import { AuthData } from "../services/authService";
import prisma from "../config/database.js";

export async function createUser(createUserData: AuthData) {
  await prisma.user.create({ data: createUserData });
}

export async function findByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}
