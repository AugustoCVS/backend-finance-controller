import { TransactionCategory } from "@prisma/client";
import { Request, Response } from "express";

import { CreateTransactionsService } from "../../../services/use-cases/transactions/create-transactions.service";
import { GetTransactionsService } from "../../../services/use-cases/transactions/get-transactions.service";
import { UpdateTransactionsService } from "../../../services/use-cases/transactions/update-transactions.service";
import { DeleteTransactionsService } from "../../../services/use-cases/transactions/delete-transactions.service";

class TransactionsController {
  async createTransaction(request: Request, response: Response) {
    const { accountId, value, type, description, date, category, userId } =
      request.body;

    const createTransactionsUseCase = new CreateTransactionsService();

    const transaction = await createTransactionsUseCase.execute({
      transactionData: {
        description,
        value,
        date,
        type,
        category,
        accountId,
        userId,
      },
    })

    return response.json(transaction);
  }

  async getTransactions(request: Request, response: Response) {
    const { userId } = request.params;
    const { limit = 10, page = 1, accountId, category } = request.query;

    const getTransactionsUseCase = new GetTransactionsService();

    const transactions = await getTransactionsUseCase.execute({
      userId: userId,
      accountId: accountId ? accountId.toString() : undefined,
      category: category ? (category as TransactionCategory) : undefined,
      limit: Number(limit),
      page: Number(page),
    });

    return response.json(transactions);
  }

  async updateTransaction(request: Request, response: Response) {
    const { id } = request.params;
    const { accountId, value, type, description, date, category } =
      request.body;

    const updateTransactionsUseCase = new UpdateTransactionsService();

    const updatedTransaction = await updateTransactionsUseCase.execute({
      id,
      transactionData: {
        description,
        value,
        date,
        type,
        category,
        accountId,
      },
    });

    return response.json(updatedTransaction);
  }

  async deleteTransaction(request: Request, response: Response) {
    const { id } = request.params;

    const deleteTransactionsUseCase = new DeleteTransactionsService();

    await deleteTransactionsUseCase.execute({ id });

    return response.status(204).send();
  }
}

export { TransactionsController };
