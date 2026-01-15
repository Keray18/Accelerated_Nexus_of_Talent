import { motion } from "framer-motion";
import { TitleCard, TitleType } from "@/components/ui/TitleBadge";

const titles: { type: TitleType; tier: number }[] = [
  { type: "creator", tier: 2 },
  { type: "breaker", tier: 3 },
  { type: "prolancer", tier: 1 },
  { type: "explorer", tier: 2 },
  { type: "architect", tier: 1 },
];

export const TitlesShowcase = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.05)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Earn</span>{" "}
            <span className="text-accent">Titles</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Behavior-driven titles that describe <em>how</em> you grow. Not ranks—identities.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {titles.map((title, index) => (
            <motion.div
              key={title.type}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TitleCard title={title.type} tier={title.tier} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-xl glass-card">
            <span className="text-sm text-muted-foreground">
              Users can hold <span className="text-accent font-semibold">multiple titles</span> simultaneously
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              Titles <span className="text-primary font-semibold">evolve</span> as you grow
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
