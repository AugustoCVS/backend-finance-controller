import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: "Token está faltando",
    });
  }

  const [, token] = authToken.split(" ");

  try{
    verify(token, process.env.JWT_SECRET)

    return next();
  }catch(err){
    return response.status(401).json({
      message: "Token inválido",
    });
  }
}
