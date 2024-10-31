import { TweetRepository } from "@/repositories/tweets-repository";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { CheckIfTweetIsLikedByUserUseCase } from "@/use-cases/checkTweetLikedByUser-useCase";
import { Response } from "express";

export const userFollowController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {


    res.status(200).json({});

  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao dar like nesse tweet", message: error });
  }
};
