import ExchangeRateCard from "@/components/exchange-rate-card";
import TransactionForm from "@/components/transaction-form";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-4 p-4 max-w-md">
      <Suspense fallback={<div>Loading...</div>}>
        <ExchangeRateCard />
      </Suspense>
      <TransactionForm />
    </div>
  );
}
