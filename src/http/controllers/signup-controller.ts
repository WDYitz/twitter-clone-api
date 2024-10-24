import { EmailAlreadyExistsError } from "@/error_handler/EmailAlreadyExistsError";
import { UserRepository } from "@/repositories/user-repository";
import { signupSchema } from "@/schemas/signup-schema";
import { SignupUseCase } from "@/use-cases/signup-useCase";
import { Request, Response } from "express";

export const signupController = async (req: Request, res: Response): Promise<any> => {
  try {
    const safeData = signupSchema.safeParse(req.body);

    if (safeData.error) {
      return res.json({ error: safeData.error.flatten().fieldErrors });
    }

    const userRepository = new UserRepository();
    const signupUseCase = new SignupUseCase(userRepository);

    const data = {
      email: safeData.data.email,
      name: safeData.data.name,
      password: safeData.data.password,
      slug: safeData.data.name,
    };

    const { token, newUser } = await signupUseCase.execute(data);

    return res.status(201).json({
      token,
      user: {
        name: newUser.user.name,
        slug: newUser.user.slug,
        avatar: newUser.user.avatar,
      },
    });
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return res.status(409).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: "Erro ao criar usuário", message: error });
  }
};
