import { Router } from "express";
import { userRoutes } from "./user/user-routes";
import { accountRoutes } from "./account/account-routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);

export { router };