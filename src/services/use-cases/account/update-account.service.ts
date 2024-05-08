import { AccountType, Bank } from "@prisma/client";
import { IAccount, IUpdateAccountDTO } from "../../../domain/interfaces/accounts";
import { client } from "../../../infra/prisma/client";

class UpdateAccountService {
  private async validateAccountInput({
    accountType,
    bank,
  }: IUpdateAccountDTO): Promise<void> {
    if (accountType) {
      if (!Object.values(AccountType).includes(accountType)) {
        throw new Error("Tipo de conta inválido");
      }
    }

    if (bank) {
      if (!Object.values(Bank).includes(bank)) {
        throw new Error("Banco inválido");
      }
    }
  }

  async execute({
    id,
    accountData,
  }: {
    id: string;
    accountData: IUpdateAccountDTO;
  }): Promise<IAccount> {
    try {
      await this.validateAccountInput(accountData);

      const accountName = `${accountData.bank} - ${accountData.accountType}`;

      const updatedAccount = await client.account.update({
        where: { id },
        data: {
          name: accountName,
          ...accountData,
        },
      });

      return updatedAccount;
    } catch (error) {
      throw new Error("Falha ao atualizar conta: " + error.message);
    }
  }
}

export { UpdateAccountService };
