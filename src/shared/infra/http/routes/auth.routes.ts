import { Router } from "express";

import { AuthUserController } from "@modules/accounts/UseCases/auth/AuthUserController";

const authUserController = new AuthUserController();
const authRoutes = Router();

authRoutes.post("/sessions", authUserController.handle);

export { authRoutes };
