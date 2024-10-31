import { UserNotFound } from "@/error_handler/UserNotFound";
import { UserRepository } from "@/repositories/user-repository";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { GetUserUseCase } from "@/use-cases/getUser-useCase";
import { Response } from "express";

export const getUserController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const { slug } = req.params;

    const userRepository = new UserRepository();
    const getUserUseCase = new GetUserUseCase(userRepository);

    const { user, followersCount, followingCount, tweetCount } = await getUserUseCase.execute(slug);

    res.status(200).json({ user, followersCount, followingCount, tweetCount });

  } catch (error) {
    if (error instanceof UserNotFound) {
      return res.status(404).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: "Erro no servidor", message: error });
  }
}