import { UserNotFound } from "@/error_handler/UserNotFound";
import { UserRepository } from "@/repositories/user-repository";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { UserFollowUseCase } from "@/use-cases/userFollow-useCase";
import { Response } from "express";

export const userFollowController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const { slug } = req.params;
    const mySlug = req.userSlug;

    const userRepository = new UserRepository();
    const userFollowUseCase = new UserFollowUseCase(userRepository);

    const data = {
      slug,
      mySlug,
    }

    const { following } = await userFollowUseCase.execute(data);

    res.status(200).json({ following });

  } catch (error) {
    if (error instanceof UserNotFound) {
      return res.status(404).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: "Erro ao dar follow nesse usuario", message: error });
  }
};
