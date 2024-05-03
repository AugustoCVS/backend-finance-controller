import dayjs from "dayjs";
import { client } from "../../../../infra/prisma/client";
import { GenerateTokenProvider } from "../../../../provider/token/generate-token.provider";
import { GenerateRefreshTokenProvider } from "../../../../provider/token/generate-refresh-token.provider";

class RefreshTokenService {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      throw new Error("Refresh Token inválido");
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(
      refreshToken.userId
    );

    if (refreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      });

      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refreshToken.userId
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}

export { RefreshTokenService };
