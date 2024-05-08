import {
  IGetTransactionsInput,
  ISearchTransactionParams,
  ITransactionResponse,
} from "../../../domain/interfaces/transactions";
import { client } from "../../../infra/prisma/client";

class GetTransactionsService {
  async execute({
    userId,
    accountId,
    category,
    limit,
    page,
  }: IGetTransactionsInput): Promise<ITransactionResponse> {
    try {
      const take = limit || 10;
      const skip = (page - 1) * take || 0;

      const transactionsQuery: Record<string, ISearchTransactionParams> = {
        where: { userId: userId },
      };

      if (category) {
        transactionsQuery.where.category = category;
      }

      if (accountId) {
        transactionsQuery.where.accountId = accountId;
      }

      const transactions = await client.transactions.findMany({
        ...transactionsQuery,
        skip,
        take,
      });

      if (!transactions) {
        throw new Error("Transações não encontradas");
      }

      const metadata = {
        total: transactions.length,
        page: skip,
        limit: take,
      };

      return {
        transactions: transactions,
        metadata: metadata,
      };
    } catch (error) {
      throw new Error("Falha ao buscar transações: " + error.message);
    }
  }
}

export { GetTransactionsService };