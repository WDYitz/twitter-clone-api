import { UserRepository } from "@/repositories/user-repository";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { verifyJWT } from "@/utils/jwt";
import type { NextFunction, Response } from "express";

export const verifyJWTMiddleware = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ erro: "Nenhum token foi oferecido." });

  const token = authHeader.split(" ")[1];

  verifyJWT(token, async (error, decoded: any) => {
    if (error) return res.status(401).json({ error: "Token inválido." });

    const userRepository = new UserRepository();
    const userData = await userRepository.findUserBySlug(decoded.slug);
    if (!userData) return res.status(401).json({ erro: "Acesso negado." });

    req.userSlug = userData.user.slug;
    next();
  });
};
