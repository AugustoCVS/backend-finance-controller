import { Router } from "express";
import { AccountController } from "../../controllers/account/account.controller";
import { ensureAuthenticated } from "../../../middlewares/ensure-authenticated";

const accountRoutes = Router();

const accountController = new AccountController();

accountRoutes.post("/create", ensureAuthenticated, accountController.createAccount);
accountRoutes.get("/list/:userId", ensureAuthenticated, accountController.getAccounts);
accountRoutes.put("/update/:id", ensureAuthenticated, accountController.updateAccount);
accountRoutes.delete("/delete/:id", ensureAuthenticated, accountController.deleteAccount);

export { accountRoutes };
