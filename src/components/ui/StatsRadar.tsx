import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  color: string;
}

interface StatsRadarProps {
  stats: Stat[];
  size?: number;
}

export const StatsRadar = ({ stats, size = 280 }: StatsRadarProps) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size * 0.4;
  const levels = [20, 40, 60, 80, 100];
  const angleStep = (2 * Math.PI) / stats.length;

  const getPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const dataPoints = stats.map((stat, index) => getPoint(stat.value, index));
  const pathData = dataPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ") + " Z";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0">
        {/* Background levels */}
        {levels.map((level) => {
          const levelPoints = stats.map((_, index) => getPoint(level, index));
          const levelPath = levelPoints
            .map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`)
            .join(" ") + " Z";
          return (
            <path
              key={level}
              d={levelPath}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth={1}
              opacity={0.5}
            />
          );
        })}

        {/* Axis lines */}
        {stats.map((_, index) => {
          const endPoint = getPoint(100, index);
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="hsl(var(--border))"
              strokeWidth={1}
              opacity={0.3}
            />
          );
        })}

        {/* Data polygon */}
        <motion.path
          d={pathData}
          fill="url(#radarGradient)"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            transformOrigin: "center",
            filter: "drop-shadow(0 0 10px hsl(var(--primary) / 0.5))",
          }}
        />

        {/* Data points */}
        {dataPoints.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={5}
            fill={stats[index].color}
            stroke="hsl(var(--background))"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 * index, type: "spring", stiffness: 300 }}
            style={{
              filter: `drop-shadow(0 0 6px ${stats[index].color})`,
            }}
          />
        ))}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0.2} />
          </linearGradient>
        </defs>
      </svg>

      {/* Labels */}
      {stats.map((stat, index) => {
        const point = getPoint(115, index);
        return (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: point.x, top: point.y }}
          >
            <div className="text-xs font-display font-semibold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
