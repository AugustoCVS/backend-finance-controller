import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import { ILogin, IUserTokenPayload } from "../../../../domain/interfaces/user";
import { client } from "../../../../infra/prisma/client";

class AuthenticateUserUseCase {
  private async validateUserInput({ email, password }: ILogin): Promise<void> {
    if (!email || !password) {
      throw new Error("Todos os campos são obrigatórios");
    }
  }

  async execute({ email, password }: ILogin): Promise<{ token: string }> {
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

      const tokenPayload: IUserTokenPayload = {
        sub: user.id,
        name: user.name,
        email: user.email,
      };

      //TODO: ALTERAR TEMPO DE EXPIRAÇÃO DO TOKEN
      const token = sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "20s",
      });

      return { token };
    } catch (error) {
      throw new Error("Falha ao autenticar usuário: " + error.message);
    }
  }
}

export { AuthenticateUserUseCase };
