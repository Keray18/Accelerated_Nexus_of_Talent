import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hover?: boolean;
  delay?: number;
}

export const GlowCard = ({
  children,
  className,
  glowColor = "hsl(var(--primary))",
  hover = true,
  delay = 0,
}: GlowCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-300",
        className
      )}
      style={{
        boxShadow: `0 0 30px ${glowColor}15, 0 4px 20px rgba(0,0,0,0.3)`,
      }}
    >
      {children}
    </motion.div>
  );
};
