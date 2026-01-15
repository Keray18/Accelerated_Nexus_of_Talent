import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TitleBadge, TitleType } from "@/components/ui/TitleBadge";
import { StatBar } from "@/components/ui/StatBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Filter,
  Users,
  Loader2,
  Clock,
  Mail,
  Github,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [minLevel, setMinLevel] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);

  const { data: candidates, isLoading } = useQuery({
    queryKey: ["candidates", searchQuery, minLevel],
    // Placeholder until real candidates API exists
    queryFn: async () => [],
  });

  const calculateMatchScore = (candidate: any) => {
    let score = 50;
    if (candidate.stats) {
      score += Math.min(30, candidate.stats.level || 0);
      score += Math.min(10, (candidate.stats.projects_completed || 0) * 2);
    }
    if (candidate.titles?.length > 0) {
      score += candidate.titles.length * 3;
    }
    return Math.min(99, score);
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Find Candidates</h1>
          <p className="text-muted-foreground">Search verified candidates by skills and level</p>
        </div>

        <GlowCard className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or role..."
                className="pl-10"
              />
            </div>
            <Select value={minLevel} onValueChange={setMinLevel}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Min Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Level</SelectItem>
                <SelectItem value="5">Level 5+</SelectItem>
                <SelectItem value="10">Level 10+</SelectItem>
                <SelectItem value="25">Level 25+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </GlowCard>

        <p className="text-sm text-muted-foreground mb-4">
          <span className="text-primary font-semibold">{candidates?.length || 0}</span> candidates found
        </p>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : candidates?.length === 0 ? (
          <GlowCard className="p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">No Candidates Found</h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </GlowCard>
        ) : (
          <div className="space-y-4">
            {candidates?.map((candidate, index) => {
              const matchScore = calculateMatchScore(candidate);
              const isExpanded = expandedCandidate === candidate.id;

              return (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div 
                    className="cursor-pointer"
                    onClick={() => setExpandedCandidate(isExpanded ? null : candidate.id)}
                  >
                    <GlowCard>
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-display font-bold text-primary-foreground">
                            {candidate.full_name?.charAt(0) || "?"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-display font-semibold text-lg">{candidate.full_name || "Anonymous"}</h3>
                              <Badge variant="outline">Lv.{candidate.stats?.level || 1}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{candidate.primary_role || "Developer"}</p>
                            <div className="flex flex-wrap gap-2">
                              {candidate.titles?.map((t: any) => (
                                <TitleBadge key={t.title} title={t.title as TitleType} tier={t.tier} size="sm" showGlow={false} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-display font-bold text-primary">{matchScore}%</span>
                          <p className="text-xs text-muted-foreground">match</p>
                        </div>
                      </div>

                      {isExpanded && candidate.stats && (
                        <div className="mt-6 pt-6 border-t border-border/50 grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-display font-semibold mb-4">Core Stats</h4>
                            <div className="space-y-3">
                              <StatBar label="Knowledge" value={candidate.stats.knowledge} size="sm" color="hsl(190, 100%, 50%)" />
                              <StatBar label="Hands-On" value={candidate.stats.hands_on} size="sm" color="hsl(150, 80%, 45%)" />
                              <StatBar label="Problem Solving" value={candidate.stats.problem_solving} size="sm" color="hsl(280, 80%, 60%)" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-display font-semibold mb-4">Activity</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 rounded-lg bg-muted/30">
                                <p className="text-2xl font-display font-bold">{candidate.stats.projects_completed}</p>
                                <p className="text-xs text-muted-foreground">Projects</p>
                              </div>
                              <div className="p-3 rounded-lg bg-muted/30">
                                <p className="text-2xl font-display font-bold">{candidate.stats.total_xp}</p>
                                <p className="text-xs text-muted-foreground">Total XP</p>
                              </div>
                            </div>
                            <Button size="sm" className="mt-4">
                              <Mail className="w-4 h-4 mr-2" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      )}
                    </GlowCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Candidates;
