import { UserTweetsCouldNotBeFound } from "@/error_handler/UserTweetsCouldNotBeFound";
import { UserRepository } from "@/repositories/user-repository";
import { userTweetsSchema } from "@/schemas/userTweets-schema";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { GetUserTweetsUseCase } from "@/use-cases/getUserTweets-useCase";
import { Response } from "express";

export const getUserTweetsController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const { slug } = req.params;
    const safeData = userTweetsSchema.safeParse(req.query);

    if (!safeData.success) {
      return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    }

    const userRepository = new UserRepository();
    const getUserTweetsUseCase = new GetUserTweetsUseCase(userRepository);

    const { tweets, page } = await getUserTweetsUseCase.execute(slug, safeData.data.page);

    res.status(200).json({ tweets, page });

  } catch (error) {
    if (error instanceof UserTweetsCouldNotBeFound) {
      return res.status(404).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: "Erro ao buscar tweets deste usuario", message: error });
  }
}