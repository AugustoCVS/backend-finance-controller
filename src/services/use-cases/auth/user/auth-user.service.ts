import { compare } from "bcryptjs";

import { ILogin, IRefreshToken } from "../../../../domain/interfaces/user";
import { client } from "../../../../infra/prisma/client";
import { GenerateTokenProvider } from "../../../../provider/token/generate-token.provider";
import { GenerateRefreshTokenProvider } from "../../../../provider/token/generate-refresh-token.provider";

class AuthenticateUserUseCase {
  private async validateUserInput({ email, password }: ILogin): Promise<void> {
    if (!email || !password) {
      throw new Error("Todos os campos são obrigatórios");
    }
  }

  async execute({ email, password }: ILogin): Promise<{ token: string; refreshToken: IRefreshToken }> {
    try {
      await this.validateUserInput({ email, password });

      const user = await client.user.findUnique({ where: { email } });

      if (!user) {
        throw new Error("Credenciais inválidas");
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Credenciais inválidas");
      }

      const generateToken = new GenerateTokenProvider();
      const token = await generateToken.execute(user.id);

      await client.refreshToken.deleteMany({
        where: {
          userId: user.id,
        },
      });

      const generateRefreshToken = new GenerateRefreshTokenProvider();
      const refreshToken = await generateRefreshToken.execute(user.id);

      return { token, refreshToken };
    } catch (error) {
      throw new Error("Falha ao autenticar usuário: " + error.message);
    }
  }
}

export { AuthenticateUserUseCase };
