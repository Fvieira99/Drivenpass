import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialRouter from "./credentialRouter.js";
import safenoteRouter from "./safenoteRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(safenoteRouter);

export default router;
