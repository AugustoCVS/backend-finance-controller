import { Request, Response } from "express";
import { CreateUserService } from "../../../services/use-cases/user/create-user.service";


class CreateUserController {
  async createUser(request: Request, response: Response) {
    const { name, email, password, confirm_password } = request.body;

    const authenticateUserUseCase = new CreateUserService();

    const user = await authenticateUserUseCase.execute({
      name,
      email,
      password,
      confirm_password,
    });

    return response.json(user);
  }
}

export { CreateUserController };
