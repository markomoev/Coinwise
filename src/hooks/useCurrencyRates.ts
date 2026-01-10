import { useState, useEffect } from "react";

interface Rates {
  [currency: string]: number;
}

export const useCurrencyRates = (baseCurrency: string = "EUR") => {
  const [rates, setRates] = useState<Rates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      // Handle rigid peg for BGN manually since API might not support it
      if (baseCurrency === "BGN") {
        setRates({ EUR: 0.51129 }); // 1 BGN = 0.51129 EUR (Fixed peg: 1.95583)
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch rates");
        }

        const data = await response.json();
        setRates(data.rates);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Count not fetch currency rates");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  return { rates, loading, error };
};