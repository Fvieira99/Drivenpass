import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();

const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);

export function encryptData(data: string) {
  return cryptr.encrypt(data);
}

export function decryptData(data: string) {
  return cryptr.decrypt(data);
}
