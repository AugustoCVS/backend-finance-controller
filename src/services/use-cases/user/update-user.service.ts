import { IUpdateUser, IUserResponse } from "../../../domain/interfaces/user";
import { client } from "../../../infra/prisma/client";
import { emailRegex } from "../../../utils/regexs";

class UpdateUserService {
  private async validateUserInput({ email }: { email: string }): Promise<void> {
    if (!emailRegex.test(email)) {
      throw new Error("Email inválido");
    }

    const userAlreadyExists = await client.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("Email indisponível");
    }
  }

  async execute(id: string, userData: IUpdateUser): Promise<IUserResponse> {
    try {
      await this.validateUserInput({
        email: userData.email,
      });

      const updatedUser = await client.user.update({
        where: { id },
        data: userData,
      });

      const newUser: IUserResponse = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      };
      
      return newUser;
    } catch (error) {
      throw new Error("Falha ao atualizar usuário: " + error.message);
    }
  }
}

export { UpdateUserService };
