import { db } from "@/lib/prisma";
import type { TrendsRepositoryInterface } from "./interfaces/trends-interface";
import type { Trend } from "@prisma/client";

export class TrendsRepository implements TrendsRepositoryInterface {
  async updateHashtag(id: number, counter: number): Promise<void> {
    await db.trend.update({
      where: { id },
      data: {
        counter, updatedAt: new Date()
      }
    })
  }
  async createHashtag(hashtag: string): Promise<void> {
    await db.trend.create({
      data: { hashtag }
    })
  }
  async findHashtag(hashtag: string): Promise<Trend> {
    const hs = await db.trend.findFirst({
      where: {
        hashtag
      }
    })

    return hs;
  }
}