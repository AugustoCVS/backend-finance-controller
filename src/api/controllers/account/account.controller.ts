import { Request, Response } from "express";
import { CreateAccountService } from "../../../services/use-cases/account/create-account.service";
import { GetAccountService } from "../../../services/use-cases/account/get-account.service";
import { UpdateAccountService } from "../../../services/use-cases/account/update-account.service";
import { DeleteAccountService } from "../../../services/use-cases/account/delete-account.service";

class AccountController {
  async createAccount(request: Request, response: Response) {
    const { bank, accountType, description, userId } = request.body;

    const createAccountUseCase = new CreateAccountService();

    const account = await createAccountUseCase.execute({
      accountData: {
        bank,
        accountType,
        description,
        userId,
      },
    })

    return response.json(account);
  }

  async getAccounts(request: Request, response: Response) {
    const { userId } = request.params;

    const getAccountsUseCase = new GetAccountService();

    const accounts = await getAccountsUseCase.execute({
      userId: userId,
    });

    return response.json(accounts);
  }

  async updateAccount(request: Request, response: Response) {
    const { id } = request.params;
    const { bank, accountType, description } = request.body;

    const updateAccountUseCase = new UpdateAccountService();

    const updatedAccount = await updateAccountUseCase.execute({
      id,
      accountData: {
        bank,
        accountType,
        description,
      },
    });

    return response.json(updatedAccount)
  }

  async deleteAccount(request: Request, response: Response) {
    const { id } = request.params;

    const deleteAccountUseCase = new DeleteAccountService();

    await deleteAccountUseCase.execute({ id });

    return response.status(204).send();
  }
}

export { AccountController };