import { TransactionCategory, TransactionType } from "@prisma/client";
import { ITransaction, IUpdateTransactionDTO } from "../../../domain/interfaces/transactions";
import { client } from "../../../infra/prisma/client";

class UpdateTransactionsService {
  private async validateTransactionInput({
    category,
    type,
  }: IUpdateTransactionDTO) {
    if (type) {
      if (!Object.values(TransactionType).includes(type)) {
        throw new Error("Tipo de transação inválido");
      }
    }

    if (category) {
      if (!Object.values(TransactionCategory).includes(category)) {
        throw new Error("Categoria de transação inválida");
      }
    }
  }

  async execute({
    id,
    transactionData,
  }: {
    id: string;
    transactionData: IUpdateTransactionDTO;
  }): Promise<ITransaction> {
    try {
      await this.validateTransactionInput(transactionData);

      const updatedTransaction = await client.transactions.update({
        where: { id },
        data: transactionData,
      });

      return updatedTransaction;
    } catch (error) {
      throw new Error("Falha ao atualizar transação: " + error.message);
    }
  }
}

export { UpdateTransactionsService };
