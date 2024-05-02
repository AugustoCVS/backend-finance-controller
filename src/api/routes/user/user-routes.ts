import { Router } from "express";

import { CreateUserController } from "../../controllers/user/user.controller";
import { AuthenticateUserController } from "../../controllers/auth/auth-controller";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post("/register", createUserController.createUser)
userRoutes.post("/login", authenticateUserController.login)

export { userRoutes };	