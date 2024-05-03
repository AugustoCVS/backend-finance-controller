import { hash } from "bcryptjs";

import { IUser } from "../../../domain/interfaces/user";
import { client } from "../../../infra/prisma/client";
class CreateUserService {
  private async validateUserInput({
    confirm_password,
    email,
    name,
    password,
  }: IUser): Promise<void> {
    if (!email || !name || !password || !confirm_password) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (password !== confirm_password) {
      throw new Error("Senhas não conferem");
    }

    const userAlreadyExists = await client.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }
  }

  async execute(userData: IUser): Promise<IUser> {
    try {
      await this.validateUserInput(userData);

      const passwordHash = await hash(userData.password, 8);
      const createdUser = await client.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: passwordHash,
          confirm_password: passwordHash,
        },
      });

      return createdUser;
    } catch (error) {
      throw new Error("Falha ao criar usuário: " + error.message);
    }
  }
}

export { CreateUserService };
