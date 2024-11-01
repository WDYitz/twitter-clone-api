import type { ExtendedRequest } from "@/types/request/extended-requests";
import { Response } from "express";

export const getFeedController = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    
    res.json({})
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar feed", message: error });
  }
}