import { env } from "@/env";
import jwt from "jsonwebtoken";

export const createJWT = (slug: string) => {
  return jwt.sign({ slug }, env.JWT_SECRET);
};

export const verifyJWT = ( 
  token: string,
  callback?: jwt.VerifyCallback<jwt.JwtPayload | string>
) => {
  return jwt.verify(token, env.JWT_SECRET, callback);
};
