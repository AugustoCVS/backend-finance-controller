import { Request, Response } from "express";
import { CreateAccountService } from "../../../services/use-cases/account/create-account.service";

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
}

export { AccountController };