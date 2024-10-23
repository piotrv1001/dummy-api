"use client";

import { createTransaction } from "@/actions/create-transaction";

export default function TransactionForm() {
  const handleSubmit = async (formData: FormData) => {
    try {
      const amount = Number(formData.get("amount"));
      const res = await createTransaction(amount);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action={handleSubmit}>
      <input
        type="number"
        placeholder="EUR"
        name="amount"
      />
      <button type="submit">Convert to PLN</button>
    </form>
  );
}
