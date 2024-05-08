import { Router } from "express";
import { TransactionsController } from "../../controllers/transactions/transactions.controller";
import { ensureAuthenticated } from "../../../middlewares/ensure-authenticated";
import { Request, Response } from "express";

const transactionsRoutes = Router();

const transactionsController = new TransactionsController();

transactionsRoutes.post("/create", ensureAuthenticated, transactionsController.createTransaction);
transactionsRoutes.get(
  "/list/:userId",
  ensureAuthenticated,
  (request: Request, _response: Response, next: Function) => {
    const { limit, page, accountId, category } = request.query;
    request.query.limit = String(limit) || "10";
    request.query.page = String(page) || "1";
    request.query.accountId = accountId;
    request.query.category = category;
    next();
  },
  transactionsController.getTransactions
);
transactionsRoutes.put("/update/:id", ensureAuthenticated, transactionsController.updateTransaction);
transactionsRoutes.delete("/delete/:id", ensureAuthenticated, transactionsController.deleteTransaction);

export { transactionsRoutes };