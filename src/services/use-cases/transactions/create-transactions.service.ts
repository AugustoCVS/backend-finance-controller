import { TransactionType, TransactionCategory } from '@prisma/client';
import { ICreateTransactionDTO, ITransaction } from "../../../domain/interfaces/transactions"
import { client } from '../../../infra/prisma/client';

class CreateTransactionsService {
  private async validateTransactionData({
    accountId,
    date,
    description,
    type,
    userId,
    value,
    category,
  }:  ICreateTransactionDTO
  ): Promise<void> {
    if (!accountId || !date || !description || !type || !userId || !value || !category) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (!Object.values(TransactionType).includes(type)) {
      throw new Error("Tipo de transação inválido");
    } 

    if (!Object.values(TransactionCategory).includes(category)) {
      throw new Error("Categoria de transação inválida");
    }
  }

  async execute({ transactionData }: { transactionData: ICreateTransactionDTO }): Promise<ITransaction> {
    try {
      await this.validateTransactionData(transactionData);

      const account = await client.account.findUnique({
        where: {
          id: transactionData.accountId
        }
      })

      await client.account.update({
        where: {
          id: transactionData.accountId
        },
        data: {
          balance: account.balance + transactionData.value
        }
      })

      const accountName = account.name;

      const transaction = await client.transactions.create({
        data: {
          description: transactionData.description,
          value: transactionData.value,
          date: transactionData.date,
          type: transactionData.type,
          category: transactionData.category,
          accountId: transactionData.accountId,
          accountName: accountName,
          userId: transactionData.userId,
        }
      })

      return transaction;
    } catch (error) {
      throw new Error("Falha ao criar uma transação: " + error.message);
    }
  }

}

export { CreateTransactionsService }