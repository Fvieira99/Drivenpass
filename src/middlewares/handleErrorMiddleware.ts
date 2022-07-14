import { NextFunction, Request, Response } from "express";

const typeToStatusCode = {
  unauthorized: 401,
  conflict: 409,
  not_found: 400
};

export default function errorHandler(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    return res.status(typeToStatusCode[err.type]).send(err.message);
  }
  res.sendStatus(500);
}
