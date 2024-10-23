import { z } from "zod";

export const exchangeRateSchema = z.object({
  exchangeRate: z.number(),
});
