// frontend/src/hooks/useUserData.ts
import { useState, useEffect } from 'react';

interface UserData {
  email: string;
  username: string;
  breachCount: number;
}

export default function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUserData({
        email: 'user@example.com',
        username: 'johndoe',
        breachCount: 3
      });
      setLoading(false);
    }, 1000);
  }, []);

  return { userData, loading, error };
}