import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type TitleType = "creator" | "breaker" | "prolancer" | "explorer" | "architect";

interface TitleBadgeProps {
  title: TitleType;
  tier?: number;
  size?: "sm" | "md" | "lg";
  showGlow?: boolean;
}

const titleConfig: Record<TitleType, { label: string; color: string; icon: string; description: string }> = {
  creator: {
    label: "Creator",
    color: "hsl(150, 80%, 45%)",
    icon: "🛠️",
    description: "Project-focused builder",
  },
  breaker: {
    label: "Breaker",
    color: "hsl(280, 80%, 60%)",
    icon: "⚡",
    description: "Problem solver",
  },
  prolancer: {
    label: "Prolancer",
    color: "hsl(45, 100%, 55%)",
    icon: "💼",
    description: "Freelance specialist",
  },
  explorer: {
    label: "Explorer",
    color: "hsl(190, 100%, 50%)",
    icon: "🔍",
    description: "Stack learner",
  },
  architect: {
    label: "Architect",
    color: "hsl(340, 80%, 55%)",
    icon: "🏗️",
    description: "System designer",
  },
};

const tierLabels = ["I", "II", "III", "IV", "V"];

export const TitleBadge = ({
  title,
  tier = 1,
  size = "md",
  showGlow = true,
}: TitleBadgeProps) => {
  const config = titleConfig[title];

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-display font-semibold border",
        sizeClasses[size]
      )}
      style={{
        backgroundColor: `${config.color}15`,
        borderColor: `${config.color}40`,
        color: config.color,
        boxShadow: showGlow ? `0 0 20px ${config.color}30` : undefined,
      }}
    >
      <span>{config.icon}</span>
      <span>
        {config.label} {tierLabels[tier - 1]}
      </span>
    </motion.div>
  );
};

export const TitleCard = ({ title, tier = 1 }: { title: TitleType; tier?: number }) => {
  const config = titleConfig[title];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass-card rounded-xl p-4 cursor-pointer transition-all duration-300"
      style={{
        borderColor: `${config.color}30`,
        boxShadow: `0 0 30px ${config.color}15`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${config.color}20` }}
        >
          {config.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display font-bold" style={{ color: config.color }}>
              {config.label} {tierLabels[tier - 1]}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{config.description}</p>
        </div>
      </div>
    </motion.div>
  );
};
