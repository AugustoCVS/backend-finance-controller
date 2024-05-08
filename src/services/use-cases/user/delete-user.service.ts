import { client } from "../../../infra/prisma/client";

class DeleteUserService {

  async execute({userId}: {userId: string}): Promise<void> {
    try {
      const user = await client.user.findUnique({
        where: { id: userId },
      });
  
      if (!user || user.active === false) {
        throw new Error("Usuário não encontrado");
      }
  
      await client.user.update({
        where: { id: userId },
        data: { active: false }
      })
    } catch (error) {
      throw new Error("Falha ao deletar usuário: " + error.message);
    }
  }

}

export { DeleteUserService}