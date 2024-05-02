import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "../../../services/use-cases/auth/authenticateUser/AuthenticateUserUseCase";

class AuthenticateUserController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const token = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };