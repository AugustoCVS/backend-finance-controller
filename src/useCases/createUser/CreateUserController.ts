import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const {name, email, password, confirm_password} = request.body;

    const authenticateUserUseCase = new CreateUserUseCase();

    const user = await authenticateUserUseCase.execute({
      name,
      email,
      password,
      confirm_password
    });

    return response.json(user);
  }
}

export { CreateUserController };