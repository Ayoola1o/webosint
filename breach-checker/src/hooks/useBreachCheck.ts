// frontend/src/hooks/useBreachCheck.ts
import { useState } from 'react';

export default function useBreachCheck() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkBreach = async (input: string) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('API error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { checkBreach, result, loading };
}