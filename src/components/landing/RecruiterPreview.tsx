import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { TitleBadge } from "@/components/ui/TitleBadge";
import { Search, Filter, Clock, CheckCircle, ArrowRight } from "lucide-react";

const mockCandidates = [
  {
    name: "Alex Chen",
    level: 34,
    role: "Backend Developer",
    titles: ["creator", "architect"] as const,
    match: 94,
    activity: "Active 2h ago",
  },
  {
    name: "Sarah Kim",
    level: 28,
    role: "Full Stack Developer",
    titles: ["breaker", "explorer"] as const,
    match: 89,
    activity: "Active today",
  },
  {
    name: "Marcus Johnson",
    level: 41,
    role: "DevOps Engineer",
    titles: ["architect"] as const,
    match: 86,
    activity: "Active 1d ago",
  },
];

export const RecruiterPreview = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_hsl(var(--secondary)/0.08)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-secondary font-display text-sm uppercase tracking-wider mb-4 block">
              For Recruiters
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Skip the</span>{" "}
              <span className="text-secondary">Resume Stack</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Enter your requirements. Get ranked candidates with verified skills, 
              recent activity, and behavioral profiles. Hire faster with confidence.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Query by skills, level range, and titles",
                "See why each candidate matched",
                "View recent activity and growth patterns",
                "Shortlist and schedule in one click",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>

            <Button variant="secondary" size="lg">
              Explore Recruiter Tools
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Right side - Mock UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowCard glowColor="hsl(var(--secondary))" className="p-0 overflow-hidden">
              {/* Search bar mock */}
              <div className="p-4 border-b border-border/50 flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Backend Developer, Node.js, Level 25+</span>
                </div>
                <Button size="sm" variant="secondary">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              {/* Results */}
              <div className="p-4 space-y-3">
                <div className="text-xs text-muted-foreground mb-4">
                  <span className="text-secondary font-semibold">24 candidates</span> matched your criteria
                </div>

                {mockCandidates.map((candidate, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display font-semibold text-foreground">
                            {candidate.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-md bg-secondary/20 text-secondary font-display">
                            Lv.{candidate.level}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">{candidate.role}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-display font-bold text-secondary">
                          {candidate.match}%
                        </span>
                        <div className="text-xs text-muted-foreground">match</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {candidate.titles.map((title) => (
                          <TitleBadge key={title} title={title} size="sm" showGlow={false} />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {candidate.activity}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
