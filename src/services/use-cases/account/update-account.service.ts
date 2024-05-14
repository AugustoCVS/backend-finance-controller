import { AccountType, Bank } from "@prisma/client";
import { IAccount, IUpdateAccountDTO } from "../../../domain/interfaces/accounts";
import { client } from "../../../infra/prisma/client";
import { accountBankName, accountTypeName } from "../../../utils/account";

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

      const accountName = `${accountBankName[accountData.bank]} - ${accountTypeName[accountData.accountType]}`;

      const updatedAccount = await client.account.update({
        where: { id },
        data: {
          name: accountName,
          ...accountData,
        },
      });

      await client.transactions.updateMany({
        where: { accountId: id },
        data: { accountName: accountName },
      });

      return updatedAccount;
    } catch (error) {
      throw new Error("Falha ao atualizar conta: " + error.message);
    }
  }
}

export { UpdateAccountService };
