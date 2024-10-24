import type { ExtendedRequest } from "@/types/request/extended-requests";
import { Request, Response } from "express";

const test = (_req: Request, res: Response) => {
  res.status(200).json({ Running: "✔️" });
};

const privateTest = (req: ExtendedRequest, res: Response) => {
  res.status(200).json({ Running_Private_Test: "✔️", slug: req.userSlug });
};

export { test, privateTest };
