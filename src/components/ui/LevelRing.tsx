import { motion } from "framer-motion";

interface LevelRingProps {
  level: number;
  currentXP: number;
  requiredXP: number;
  size?: number;
}

const getLevelColor = (level: number) => {
  if (level < 10) return "hsl(200, 30%, 50%)"; // Novice - Steel
  if (level < 25) return "hsl(150, 60%, 45%)"; // Adept - Emerald
  if (level < 50) return "hsl(270, 70%, 55%)"; // Expert - Violet
  if (level < 75) return "hsl(45, 100%, 55%)"; // Master - Gold
  return "hsl(340, 80%, 55%)"; // Legend - Ruby
};

const getLevelTitle = (level: number) => {
  if (level < 10) return "Novice";
  if (level < 25) return "Adept";
  if (level < 50) return "Expert";
  if (level < 75) return "Master";
  return "Legend";
};

export const LevelRing = ({
  level,
  currentXP,
  requiredXP,
  size = 160,
}: LevelRingProps) => {
  const progress = (currentXP / requiredXP) * 100;
  const strokeWidth = size * 0.06;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const color = getLevelColor(level);
  const title = getLevelTitle(level);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 8px ${color}80)`,
          }}
        />
        {/* Glow effect */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth}
          fill="none"
          stroke={color}
          strokeWidth={1}
          opacity={0.3}
          style={{
            filter: `blur(4px)`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <span
            className="font-display text-4xl font-black"
            style={{ color, textShadow: `0 0 20px ${color}60` }}
          >
            {level}
          </span>
          <div className="text-xs font-display uppercase tracking-wider text-muted-foreground mt-1">
            {title}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
