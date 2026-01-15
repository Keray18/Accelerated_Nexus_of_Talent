import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export const StatBar = ({
  label,
  value,
  maxValue = 100,
  color,
  showValue = true,
  size = "md",
  animated = true,
}: StatBarProps) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        {showValue && (
          <span className="text-xs font-display font-bold" style={{ color }}>
            {value}/{maxValue}
          </span>
        )}
      </div>
      <div className={cn("stat-bar", sizeClasses[size])}>
        <motion.div
          className="stat-bar-fill"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}60, 0 0 20px ${color}30`,
          }}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
};
