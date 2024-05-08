import { client } from "../../../infra/prisma/client";

class DeleteTransactionsService {
  async execute({ id }: { id: string }): Promise<void> {
    try {
      const transaction = await client.transactions.findUnique({
        where: { id },
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
