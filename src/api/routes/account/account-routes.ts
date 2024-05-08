import { Router } from "express";
import { AccountController } from "../../controllers/account/account.controller";
import { ensureAuthenticated } from "../../../middlewares/ensure-authenticated";

const accountRoutes = Router();

const accountController = new AccountController();

accountRoutes.post("/create", ensureAuthenticated, accountController.createAccount);

export { accountRoutes };
