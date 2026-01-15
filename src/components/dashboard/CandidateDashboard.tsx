import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { LevelRing } from "@/components/ui/LevelRing";
import { StatsRadar } from "@/components/ui/StatsRadar";
import { StatBar } from "@/components/ui/StatBar";
import { TitleBadge, TitleType } from "@/components/ui/TitleBadge";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Target, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  Code,
  Brain,
  Briefcase,
  BookOpen,
  Loader2
} from "lucide-react";
import { FaAutoprefixer } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const activityIcons = {
  project: Code,
  problem_solving: Brain,
  learning: BookOpen,
  freelancing: Briefcase,
};

export const CandidateDashboard = () => {
  const { user } = useAuth();
  const { profile, stats, titles, loading } = useUserData();
  // Placeholder until activity API exists
  const activities: any[] = [];

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      </AppLayout>
    );
  }

  const userStats = [
    { label: "Knowledge", value: stats?.knowledge || 10, color: "hsl(190, 100%, 50%)" },
    { label: "Hands-On", value: stats?.hands_on || 10, color: "hsl(150, 80%, 45%)" },
    { label: "Problem Solving", value: stats?.problem_solving || 10, color: "hsl(280, 80%, 60%)" },
    { label: "Consistency", value: stats?.consistency || 10, color: "hsl(45, 100%, 55%)" },
    { label: "Depth", value: stats?.depth || 10, color: "hsl(340, 80%, 55%)" },
    { label: "Collaboration", value: stats?.collaboration || 10, color: "hsl(200, 80%, 55%)" },
  ];

  const level = stats?.level || 1;
  const totalXP = stats?.total_xp || 0;
  const xpToNext = stats?.xp_to_next_level || 100;
  const xpProgress = Math.min(100, (totalXP % xpToNext) / xpToNext * 100);

  const recommendations = [
    { 
      icon: Code, 
      action: "Add a project to your portfolio", 
      reason: "Boost your Hands-On stat",
      color: "hsl(150, 80%, 45%)",
      href: "/projects"
    },
    { 
      icon: Brain, 
      action: "Solve coding challenges", 
      reason: "Increase Problem Solving",
      color: "hsl(280, 80%, 60%)",
      href: "/challenges"
    },
    { 
      icon: Briefcase, 
      action: "Take a freelance gig", 
      reason: "Start earning Prolancer title",
      color: "hsl(45, 100%, 55%)",
      href: "/gigs"
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Stats */}
          <div className="space-y-6">
            {/* Level Card */}
            <GlowCard>
              <div className="flex flex-col items-center">
                <LevelRing 
                  level={level} 
                  currentXP={totalXP % xpToNext} 
                  requiredXP={xpToNext} 
                  size={180} 
                />
                <div className="mt-4 text-center">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {profile?.full_name || "Player"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {profile?.primary_role || "Developer"}
                  </p>
                </div>
                
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {titles.length > 0 ? (
                    titles.map((title) => (
                      <TitleBadge 
                        key={title.title} 
                        title={title.title as TitleType} 
                        tier={title.tier} 
                        size="sm" 
                      />
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">Complete activities to earn titles!</p>
                  )}
                </div>

                <div className="mt-6 w-full">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">XP to next level</span>
                    <span className="font-display font-bold text-primary">
                      {xpToNext - (totalXP % xpToNext)} XP
                    </span>
                  </div>
                  <div className="stat-bar h-2">
                    <motion.div
                      className="stat-bar-fill bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      style={{ boxShadow: "0 0 15px hsl(var(--primary) / 0.5)" }}
                    />
                  </div>
                </div>
              </div>
            </GlowCard>

            {/* Stats Breakdown */}
            <GlowCard>
              <h3 className="font-display font-semibold mb-4 text-foreground">Core Stats</h3>
              <div className="space-y-4">
                {userStats.map((stat) => (
                  <StatBar
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    color={stat.color}
                    size="sm"
                  />
                ))}
              </div>
            </GlowCard>
          </div>

          {/* Center Column - Radar & Stats */}
          <div className="space-y-6">
            {/* Stats Radar */}
            <GlowCard className="flex flex-col items-center">
              <h3 className="font-display font-semibold mb-4 text-foreground self-start">Skill Distribution</h3>
              <StatsRadar stats={userStats} size={280} />
            </GlowCard>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <GlowCard className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">
                      {stats?.projects_completed || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">
                      {stats?.problems_solved || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Problems</p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">
                      {stats?.gigs_completed || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Gigs</p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <FaAutoprefixer className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">
                      {stats?.current_streak || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>

          {/* Right Column - Activity & Recommendations */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <GlowCard>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">Recent Activity</h3>
                </div>
              </div>

              {activities && activities.length > 0 ? (
                <div className="space-y-3">
                  {activities.map((activity, index) => {
                    const Icon = activityIcons[activity.activity_type as keyof typeof activityIcons] || Code;
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-display font-bold text-primary">
                            +{activity.xp_earned}
                          </span>
                          <span className="text-xs text-muted-foreground block">XP</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">No activity yet.</p>
                  <p className="text-xs text-muted-foreground mt-1">Start by adding a project!</p>
                </div>
              )}
            </GlowCard>

            {/* Recommendations */}
            <GlowCard glowColor="hsl(var(--accent))">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h3 className="font-display font-semibold text-foreground">What to Do Next</h3>
              </div>

              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <Link key={index} to={rec.href}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="p-3 rounded-lg border transition-all hover:bg-muted/30 cursor-pointer group"
                      style={{ borderColor: `${rec.color}30` }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${rec.color}20` }}
                        >
                          <rec.icon className="w-5 h-5" style={{ color: rec.color }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {rec.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{rec.reason}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
