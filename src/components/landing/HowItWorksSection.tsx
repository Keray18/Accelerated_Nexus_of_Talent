import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Code, Brain, Briefcase, BookOpen, Trophy, Search } from "lucide-react";

const steps = [
  {
    icon: Code,
    title: "Build Projects",
    description: "Ship real projects. Connect GitHub. Earn XP based on complexity and impact.",
    color: "hsl(150, 80%, 45%)",
  },
  {
    icon: Brain,
    title: "Solve Problems",
    description: "Complete challenges. Difficulty-weighted XP. Accuracy beats volume.",
    color: "hsl(280, 80%, 60%)",
  },
  {
    icon: Briefcase,
    title: "Freelance",
    description: "Take real gigs. Client ratings build your reputation. Milestones verified.",
    color: "hsl(45, 100%, 55%)",
  },
  {
    icon: BookOpen,
    title: "Keep Learning",
    description: "Certificates count. But learning must link to applied output.",
    color: "hsl(190, 100%, 50%)",
  },
  {
    icon: Trophy,
    title: "Earn Titles",
    description: "Creator. Breaker. Architect. Titles describe how you grow.",
    color: "hsl(340, 80%, 55%)",
  },
  {
    icon: Search,
    title: "Get Discovered",
    description: "Recruiters query by skills, levels, and titles. No resume screening.",
    color: "hsl(200, 80%, 55%)",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--secondary)/0.05)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">How You</span>{" "}
            <span className="text-primary glow-text">Level Up</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Multiple paths to growth. Every action earns XP. Your profile tells your story.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <GlowCard key={index} glowColor={step.color} delay={index * 0.1}>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${step.color}20` }}
              >
                <step.icon className="w-7 h-7" style={{ color: step.color }} />
              </div>
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: step.color }}>
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};
