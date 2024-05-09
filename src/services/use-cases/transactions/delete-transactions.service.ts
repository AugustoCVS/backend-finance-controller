import { client } from "../../../infra/prisma/client";

class DeleteTransactionsService {
  async execute({ id }: { id: string }): Promise<void> {
    try {
      const transaction = await client.transactions.findUnique({
        where: { id },
      });

      const account = await client.account.findUnique({
        where: { id: transaction.accountId },
      });

      if (!account) {
        throw new Error("Conta não encontrada");
      }

      await client.account.update({
        where: { id: transaction.accountId },
        data: { balance: account.balance - transaction.value },
      });

      if (!transaction) {
        throw new Error("Transação não encontrada");
      }

      await client.transactions.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Falha ao deletar transação: " + error.message);
    }
  }
}

export { DeleteTransactionsService };
