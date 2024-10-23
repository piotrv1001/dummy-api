"use server";

import { createTransactionSchema } from "@/schemas/create-transaction";
import axios from "axios";

export const createTransaction = async (amountInEur: number) => {
  const res = await axios.post("http://localhost:3001/transaction", { amountInEur });
  const parsedBody = createTransactionSchema.safeParse(res.data);
  if (!parsedBody.success) {
    console.error(parsedBody.error.errors);
    throw new Error("Error creating transaction");
  }
  return { amountInPln: parsedBody.data.amountInPln };  
}