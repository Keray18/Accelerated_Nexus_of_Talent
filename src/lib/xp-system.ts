type ActivityType = 'project' | 'problem_solving' | 'freelancing' | 'learning';

interface XPGain {
  xp: number;
  statUpdates: Partial<{
    knowledge: number;
    hands_on: number;
    problem_solving: number;
    consistency: number;
    depth: number;
    collaboration: number;
  }>;
  titleProgress?: {
    title: 'creator' | 'breaker' | 'prolancer' | 'explorer' | 'architect';
    xp: number;
  };
}

const XP_CONFIG: Record<ActivityType, { baseXP: number; stats: string[]; title: string }> = {
  project: { baseXP: 100, stats: ['hands_on', 'depth'], title: 'creator' },
  problem_solving: { baseXP: 25, stats: ['problem_solving', 'knowledge'], title: 'breaker' },
  freelancing: { baseXP: 150, stats: ['collaboration', 'hands_on'], title: 'prolancer' },
  learning: { baseXP: 50, stats: ['knowledge'], title: 'explorer' },
};

// Calculate XP needed for a given level
export const xpForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.2, level - 1));
};

// Calculate level from total XP
export const levelFromXP = (totalXP: number): { level: number; xpInLevel: number; xpToNext: number } => {
  let level = 1;
  let xpRemaining = totalXP;
  
  while (xpRemaining >= xpForLevel(level)) {
    xpRemaining -= xpForLevel(level);
    level++;
  }
  
  return {
    level,
    xpInLevel: xpRemaining,
    xpToNext: xpForLevel(level),
  };
};

// Award XP to a user (frontend placeholder — real logic now lives in backend)
export const awardXP = async (
  _userId: string,
  activityType: ActivityType,
  _title: string,
  _description: string,
  bonusXP: number = 0
): Promise<{ success: boolean; xpEarned: number; levelUp: boolean }> => {
  const config = XP_CONFIG[activityType];
  const xpEarned = config.baseXP + bonusXP;
  // Placeholder: assume no level-up logic on the frontend
  return { success: true, xpEarned, levelUp: false };
};
