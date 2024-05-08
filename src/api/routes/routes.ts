import { Router } from "express";
import { userRoutes } from "./user/user-routes";
import { accountRoutes } from "./account/account-routes";
import { transactionsRoutes } from "./transactions/transactions-routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);
router.use("/transactions", transactionsRoutes);

export { router };