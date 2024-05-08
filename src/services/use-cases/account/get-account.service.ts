import { IAccount } from "../../../domain/interfaces/accounts";
import { client } from "../../../infra/prisma/client";

class GetAccountService {
  async execute({ userId }: { userId: string }): Promise<IAccount[]> {
    try {
      const accounts = await client.account.findMany({
        where: { userId: userId },
      });

      if (!accounts) {
        throw new Error("Contas não encontradas");
      }

      return accounts;
    } catch (error) {
      throw new Error("Falha ao buscar conta: " + error.message);
    }
  }
}


export { GetAccountService };