import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// This shape is based on your new backend user/profile
export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  coreDomain: string;
  coreSkills: string[];
  supportingSkills?: string[];
  commonSkills?: string[];
  // Extra fields used by existing UI (mapped from the above)
  full_name?: string;
  primary_role?: string;
  tech_stack?: string[];
  bio?: string;
  github_username?: string;
  linkedin_url?: string;
  portfolio_url?: string;
}

export interface UserStats {
  totalXp: number;
  completedTasks: number;
  ranking: number;
}

export interface UserTitle {
  title: string;
  earnedAt: string;
}

export interface ActivityLog {
  action: string;
  createdAt: string;
}

export interface UserData {
  profile: Profile | null;
  stats: UserStats | null;
  titles: UserTitle[];
  activities: ActivityLog[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/users';

export const useUserData = () => {
  const { token } = useAuth();

  const [data, setData] = useState<UserData>({
    profile: null,
    stats: null,
    titles: [],
    activities: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch profile.');
      const result = await res.json();

      const backendProfile = result.profile as Profile;

      setData({
        profile: {
          ...backendProfile,
          full_name: `${backendProfile.firstName} ${backendProfile.lastName}`,
          primary_role: backendProfile.coreDomain,
          tech_stack: backendProfile.coreSkills,
        },
        // Placeholder stats/titles/activities until backend endpoints exist
        stats: {
          totalXp: 5000,
          completedTasks: 10,
          ranking: 1,
        },
        titles: [
          {
            title: 'Final Boss',
            earnedAt: '2002-18-01',
          },
        ],
        activities: [],
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return { ...data, loading, error, refetch: fetchUser };
};
