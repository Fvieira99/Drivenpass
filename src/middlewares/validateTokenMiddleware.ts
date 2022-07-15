import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const KEY = process.env.JWT_SECRET_KEY;

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];
  const token = authorization?.replace("Bearer ", "");
  console.log(token);
  if (!token) {
    throw { type: "unauthorized", message: "You don't have a token." };
  }
  const user = jwt.verify(token, KEY, verifyPossibleError);

  res.locals.user = user;
  next();
}

function verifyPossibleError(err, decoded) {
  if (err) {
    throw { type: "unauthorized", message: "Token is not valid." };
  }
  return decoded;
}
