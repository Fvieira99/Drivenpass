import { Router } from "express";
import validateToken from "../middlewares/validateTokenMiddleware.js";
import {
  createCredential,
  deleteCredential,
  getAllCredentials,
  getOneCredential
} from "../controllers/credentialController.js";

const credentialRouter = Router();

credentialRouter.use(validateToken);

credentialRouter.post("/credentials", createCredential);
credentialRouter.get("/credentials", getAllCredentials);
credentialRouter.get("/credentials/credential/:id", getOneCredential);
credentialRouter.delete("/credentials/credential/:id", deleteCredential);

export default credentialRouter;
