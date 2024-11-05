import { UserRepository } from "@/repositories/user-repository";
import type { ExtendedRequest } from "@/types/request/extended-requests";
import { GetSuggestionsUseCase } from "@/use-cases/getSuggestions-useCase";
import { Response } from "express";

export const getSuggestionsController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const userRepository = new UserRepository();
    const getSuggestionsUseCase = new GetSuggestionsUseCase(userRepository);

    const suggestions = await getSuggestionsUseCase.execute(req.userSlug);

    res.json({ suggestions })
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar as sugestões", message: error });
  }
}