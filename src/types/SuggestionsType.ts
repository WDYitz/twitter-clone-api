import type { Prisma } from "@prisma/client";

export type SuggestionsType = Pick<Prisma.UserGetPayload<Prisma.UserDefaultArgs>, 'name' | 'avatar' | 'slug'>;