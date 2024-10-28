import { AccessDeniedError } from "@/error_handler/AccessDenied";
import { UserRepository } from "@/repositories/user-repository";
import { signinSchema } from "@/schemas/signin-schema";
import { SigninUseCase } from "@/use-cases/signin-useCase";
import { Request, Response } from "express";

export const signinController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const safeData = signinSchema.safeParse(req.body);

    if (safeData.error) {
      return res.json({ error: safeData.error.flatten().fieldErrors });
    }

    const userRepository = new UserRepository();
    const signinUseCase = new SigninUseCase(userRepository);

    const data = {
      email: safeData.data.email,
      password: safeData.data.password,
    };

    const { token, userData } = await signinUseCase.execute(data);

    return res.status(200).json({
      token,
      user: {
        name: userData.user.name,
        slug: userData.user.slug,
        avatar: userData.user.avatar,
      },
    });
  } catch (error) {
    if (error instanceof AccessDeniedError) {
      return res.status(401).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: "Erro ao buscar usuario", message: error });
  }
};
