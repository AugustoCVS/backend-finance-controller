import { sign } from 'jsonwebtoken';
import { compare } from "bcryptjs";

import { ILogin, IUserTokenPayload } from "../../../../domain/interfaces/user";
import { client } from "../../../../infra/prisma/client";
;


class AuthenticateUserUseCase {
  async execute({ email, password }: ILogin) {

    const allFieldsAreFilled = email && password;

    if (!allFieldsAreFilled) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const userAlreadyExists = await client.user.findFirst({
      where: {
        email,
      },
    });

    if (!userAlreadyExists) {
      throw new Error("Credenciais inválidas");
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error("Credenciais inválidas");
    }
    const tokenPayload: IUserTokenPayload = {
      sub: userAlreadyExists.id,
      name: userAlreadyExists.name,
      email: userAlreadyExists.email,
    };

    //TODO: ALTERAR TEMPO DE EXPIRAÇÃO DO TOKEN
    const token = sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "20s",
    });

    return { token };
  }
}

export { AuthenticateUserUseCase };