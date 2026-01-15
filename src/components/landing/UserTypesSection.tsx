import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, Users, Briefcase, Shield, ArrowRight } from "lucide-react";

const userTypes = [
  {
    icon: User,
    title: "Candidate",
    subtitle: "The Player",
    description: "Level up through projects, problem-solving, and real work. Get discovered by matching recruiters.",
    roles: ["Backend Dev", "Frontend Dev", "AI/ML", "QA", "DevOps", "IT HR", "IT Sales"],
    color: "hsl(var(--primary))",
    cta: "Start Leveling",
  },
  {
    icon: Users,
    title: "Recruiter",
    subtitle: "The Scout",
    description: "Query candidates by skills, levels, and behavioral titles. Skip resume screening entirely.",
    features: ["Skill-based search", "Instant shortlisting", "Activity insights"],
    color: "hsl(var(--secondary))",
    cta: "Find Talent",
  },
  {
    icon: Briefcase,
    title: "Freelance Client",
    subtitle: "The Patron",
    description: "Post gigs, hire verified talent, and trust milestone-based delivery with built-in accountability.",
    features: ["Verified freelancers", "Milestone tracking", "Dispute protection"],
    color: "hsl(var(--accent))",
    cta: "Post a Gig",
  },
];

export const UserTypesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--primary)/0.08)_0%,_transparent_60%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Choose Your</span>{" "}
            <span className="text-secondary">Path</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're building your career or building your team, there's a place for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {userTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl p-8 border transition-all duration-300 group"
              style={{ borderColor: `${type.color}30` }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${type.color}15` }}
              >
                <type.icon className="w-8 h-8" style={{ color: type.color }} />
              </div>

              <div className="mb-4">
                <h3 className="font-display text-2xl font-bold mb-1" style={{ color: type.color }}>
                  {type.title}
                </h3>
                <span className="text-sm text-muted-foreground">{type.subtitle}</span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {type.description}
              </p>

              {type.roles && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {type.roles.slice(0, 4).map((role) => (
                    <span
                      key={role}
                      className="text-xs px-2 py-1 rounded-md border"
                      style={{
                        backgroundColor: `${type.color}10`,
                        borderColor: `${type.color}30`,
                        color: type.color,
                      }}
                    >
                      {role}
                    </span>
                  ))}
                  {type.roles.length > 4 && (
                    <span className="text-xs text-muted-foreground">+{type.roles.length - 4} more</span>
                  )}
                </div>
              )}

              {type.features && (
                <ul className="space-y-2 mb-6">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: type.color }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              <Button
                variant="outline"
                className="w-full group-hover:bg-primary/10"
                style={{ borderColor: `${type.color}40`, color: type.color }}
              >
                {type.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
