import { z } from "zod";

export const createTransactionSchema = z.object({
  amountInPln: z.number(),
});
