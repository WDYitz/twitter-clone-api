import { env } from "@/env"

export const getPublicURL = (url: string) => {
  return `${env.BASE_URL}/${url}`
}