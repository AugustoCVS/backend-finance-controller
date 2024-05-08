import { AccountType, Bank } from "@prisma/client";
import { ICreateAccountDTO } from "../../../domain/interfaces/accounts";
import { client } from "../../../infra/prisma/client";

class CreateAccountService {
  private async validateAccountInput({
    accountType,
    bank,
    description,
    userId,
  }: ICreateAccountDTO) {
    if (!accountType || !bank || !description || !userId) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (!Object.values(AccountType).includes(accountType)) {
      throw new Error("Tipo de conta inválido");
    }

    if (!Object.values(Bank).includes(bank)) {
      throw new Error("Banco inválido");
    }
  }

  async execute({ accountData }: { accountData: ICreateAccountDTO }) {
    try {
      await this.validateAccountInput(accountData);

      const accountName = `${accountData.bank} - ${accountData.accountType}`;
      const balance = 0;

      const createdAccount = await client.account.create({
        data: {
          name: accountName,
          balance: balance,
          bank: accountData.bank as Bank,
          accountType: accountData.accountType,
          description: accountData.description,
          userId: accountData.userId,
        },
      });

      return createdAccount;
    } catch (error) {
      throw new Error("Falha ao criar conta: " + error.message);
    }
  }
}

export { CreateAccountService };
