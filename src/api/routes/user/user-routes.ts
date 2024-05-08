import { Router } from "express";

import { UserController } from "../../controllers/user/user.controller";
import { AuthenticateUserController } from "../../controllers/auth/auth.controller";
import { RefreshTokenUserController } from "../../controllers/auth/refresh-token.controller";
import { ensureAuthenticated } from "../../../middlewares/ensure-authenticated";

const userRoutes = Router();

const userController = new UserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenUserController();


userRoutes.post("/login", authenticateUserController.login)
userRoutes.post("/refreshToken", refreshTokenController.handle)

userRoutes.post("/register", userController.createUser)
userRoutes.get("/:id", ensureAuthenticated, userController.getUserById)
userRoutes.put("/:id", ensureAuthenticated, userController.updateUser)
userRoutes.put("/delete/:id", ensureAuthenticated, userController.deleteUser)

userRoutes.get("/profile", ensureAuthenticated, (req, res) => {
  return res.json({ message: "Hello World" });
})

export { userRoutes };	