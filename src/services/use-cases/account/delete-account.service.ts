import { client } from "../../../infra/prisma/client";

class DeleteAccountService {
  async execute({ id }: { id: string }): Promise<void> {
    try {
      const account = await client.account.findUnique({
        where: { id },
      });

      if (!account) {
        throw new Error("Conta não encontrada");
      }

      await client.transactions.deleteMany({
        where: { accountId: id },
      });
      await client.account.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Falha ao deletar conta: " + error.message);
    }
  }
}

export { DeleteAccountService };
