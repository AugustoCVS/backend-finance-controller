import { Router } from "express";
import { TransactionsController } from "../../controllers/transactions/transactions.controller";
import { ensureAuthenticated } from "../../../middlewares/ensure-authenticated";
import { Request, Response } from "express";

const transactionsRoutes = Router();

const transactionsController = new TransactionsController();

transactionsRoutes.post("/create", ensureAuthenticated, transactionsController.createTransaction);
transactionsRoutes.get(
  "/list/:userId/:accountId?/:category?",
  ensureAuthenticated,
  (request: Request, _response: Response, next: Function) => {
    const { limit, page } = request.query;
    request.query.limit = String(limit) || "10";
    request.query.page = String(page) || "1";
    next();
  },
  transactionsController.getTransactions
);
transactionsRoutes.put("/update/:id", ensureAuthenticated, transactionsController.updateTransaction);
transactionsRoutes.delete("/delete/:id", ensureAuthenticated, transactionsController.deleteTransaction);

export { transactionsRoutes };