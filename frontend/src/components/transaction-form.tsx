"use client";

import { createTransaction } from "@/actions/create-transaction";
import { useState } from "react";

export default function TransactionForm() {
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      const amount = Number(formData.get("amount"));
      const res = await createTransaction(amount);
      setAmount(res.amountInPln);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-y-4 w-full">
      <input
        type="number"
        placeholder="EUR"
        name="amount"
        className="p-2 border-black border rounded-md"
      />
      <button
        type="submit"
        className="bg-black rounded-md text-white px-3 py-1"
      >
        Convert to PLN
      </button>
      {amount !== null && (
        <span className="text-green-400 mt-4 font-semibold">
          {amount.toFixed(2)} PLN
        </span>
      )}
      {error !== null && (
        <span className="text-red-400 mt-4 font-semibold">{error}</span>
      )}
    </form>
  );
}
