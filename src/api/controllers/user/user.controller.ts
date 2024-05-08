import { Request, Response } from "express";
import { CreateUserService } from "../../../services/use-cases/user/create-user.service";
import { GetUserService } from "../../../services/use-cases/user/get-user.service";
import { UpdateUserService } from "../../../services/use-cases/user/update-user.service";
import { DeleteUserService } from "../../../services/use-cases/user/delete-user.service";
class UserController {
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

  async getUserById(request: Request, response: Response) {
    const { id } = request.params;

    const getUserUseCase = new GetUserService();

    const user = await getUserUseCase.execute({
      userId: id,
    });

    return response.json(user);
  }

  async updateUser(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateUserUseCase = new UpdateUserService();

    const user = await updateUserUseCase.execute(id, {
      name,
      email,
    });

    return response.json(user);
  }

  async deleteUser(request: Request, response: Response) {
    const { id } = request.params;

    const deleteUserUseCase = new DeleteUserService();

    await deleteUserUseCase.execute({
      userId: id,
    });

    return response.status(204).send();
  }
}

export { UserController };
