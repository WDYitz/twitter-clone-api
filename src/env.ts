import z from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.string().default('development'),
  BASE_URL: z.string().default('http://localhost:3000'),
  JWT_SECRET: z.string()
})

export const env = envSchema.parse(process.env);