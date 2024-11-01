import { UserRepository } from "@/repositories/user-repository";
import { updateUserSchema } from "@/schemas/updateUser-schema";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { UpdateUserInfoUseCase } from "@/use-cases/updateUserInfo-useCase";
import { Response } from "express";

export const updateUserController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const slug = req.userSlug;
    const safeData = updateUserSchema.safeParse(req.body);

    if (!safeData.success) {
      return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    }

    const userRepository = new UserRepository();
    const updateUserInfoUseCase = new UpdateUserInfoUseCase(userRepository);

    const data = {
      name: safeData.data.name,
      bio: safeData.data.bio,
      link: safeData.data.link
    }

    await updateUserInfoUseCase.execute(slug, data);

    res.status(200).json({})
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao atualizar usuario", message: error });

  }
}