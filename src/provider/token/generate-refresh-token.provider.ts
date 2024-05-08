import dayjs from "dayjs";

import { client } from "../../infra/prisma/client";
import { IRefreshToken } from "../../domain/interfaces/user";

class GenerateRefreshTokenProvider {

  async execute(userId: string): Promise<IRefreshToken>{
    const expiresIn = dayjs().add(14, 'days').unix(); 

    const generateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })

    return generateRefreshToken;
  }

}

export { GenerateRefreshTokenProvider };