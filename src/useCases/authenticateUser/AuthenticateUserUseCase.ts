import { compare } from "bcryptjs";

import { client } from "../../prisma/client";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

interface ITokenPayload {
  sub: string;
  name: string;
  email: string;
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {

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
    const tokenPayload: ITokenPayload = {
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