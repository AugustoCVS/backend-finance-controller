import { Router } from "express";

import { CreateUserController } from "../../controllers/user/user.controller";
import { AuthenticateUserController } from "../../controllers/auth/auth.controller";
import { RefreshTokenUserController } from "../../controllers/auth/refresh-token.controller";
import { ensureAuthenticated } from "../../../middlewares/ensure-authenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenUserController();

userRoutes.post("/register", createUserController.createUser)
userRoutes.post("/login", authenticateUserController.login)
userRoutes.post("/refreshToken", ensureAuthenticated, refreshTokenController.handle)

export { userRoutes };	