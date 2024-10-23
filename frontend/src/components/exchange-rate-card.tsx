import { exchangeRateSchema } from "@/schemas/exchange-rate-schema";
import axios from "axios";

export default async function ExchangeRateCard() {
  const res = await axios.get("http://localhost:3001/exchange-rate");
  const parsedBody = exchangeRateSchema.safeParse(res.data);
  if (!parsedBody.success) {
    console.error(parsedBody.error.errors);
    return <div>Error fetching exchange rate</div>
  }
  return <div>PLN to EUR exchange rate: {parsedBody.data.exchangeRate}</div>;
}