import type { Trend } from "@prisma/client";

export interface TrendsRepositoryInterface {
  updateHashtag(id: number, counter: number): Promise<void>;
  createHashtag(hashtag: string): Promise<void>;
  findHashtag(hashtag: string): Promise<Trend>;
}