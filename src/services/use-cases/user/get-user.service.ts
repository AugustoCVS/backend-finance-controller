import { IUserResponse } from "../../../domain/interfaces/user";
import { client } from "../../../infra/prisma/client";

class GetUserService {
  async execute({ userId }: { userId: string }): Promise<IUserResponse> {
    try {
      const user = await client.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return userResponse;
    } catch (error) {
      throw new Error("Falha ao buscar usuário: " + error.message);
    }
  }
}

export { GetUserService };
