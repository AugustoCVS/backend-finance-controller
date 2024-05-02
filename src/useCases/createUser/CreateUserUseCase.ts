import { hash } from "bcryptjs";

import { client } from "../../prisma/client";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

class CreateUserUseCase {
  async execute({ confirm_password, email, name, password }: IUserRequest) {

    const allFieldsAreFilled = name && email && password && confirm_password;

    if (!allFieldsAreFilled) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (password !== confirm_password) {
      throw new Error("Senhas não conferem");
    }

    const userAlreadyExists = await client.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário ja existe");
    }

    const passwordHash = await hash(password, 8);
    const confirm_passwordHash = await hash(confirm_password, 8);

    const user = await client.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        confirm_password: confirm_passwordHash,
      },
    });

    return user;
  }
}

export { CreateUserUseCase };
