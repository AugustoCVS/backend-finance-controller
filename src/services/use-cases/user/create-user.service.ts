import { hash } from "bcryptjs";
import { client } from "../../../infra/prisma/client";
import { IUser } from "../../../domain/interfaces/user";

const allFieldsAreFilled = ({
  confirm_password,
  email,
  name,
  password,
}: IUser): void => {
  const allFieldsAreFilled = name && email && password && confirm_password;

  if (!allFieldsAreFilled) {
    throw new Error("Todos os campos são obrigatórios");
  }
};

const verifyPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}): void => {
  if (password !== confirm_password) {
    throw new Error("Senhas não conferem");
  }
};

const verifyIfUserAlreadyExists = async ({
  email,
}: {
  email: string;
}): Promise<void> => {
  const userAlreadyExists = await client.user.findFirst({
    where: {
      email,
    },
  });

  if (userAlreadyExists) {
    throw new Error("Usuário ja existe");
  }
};

const saveUserOnDatabase = async ({ confirm_password, email, name, password }: IUser): Promise<IUser> => {
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

class CreateUserService {
  async execute({ confirm_password, email, name, password }: IUser) {
    allFieldsAreFilled({
      confirm_password,
      email,
      name,
      password,
    });

    verifyPassword({
      password,
      confirm_password,
    });

    verifyIfUserAlreadyExists({
      email,
    });

    saveUserOnDatabase({
      confirm_password,
      email,
      name,
      password
    })

  }
}

export { CreateUserService };
