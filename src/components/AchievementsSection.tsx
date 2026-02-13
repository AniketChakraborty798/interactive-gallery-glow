import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, CheckCircle } from "lucide-react";

const achievements = [
  {
    title: "Core Operations Team Member",
    description: "Served as a key member of the operations team at InterviewGod, supporting the CEO in daily business activities.",
    icon: Award,
  },
  {
    title: "CEO Office – Strategic Support Role",
    description: "Provided strategic support in an AI-driven hiring platform, contributing to planning and business development.",
    icon: CheckCircle,
  },
  {
    title: "Verified ECWoC Participant",
    description: "Recognized as a verified participant in the Elite Coders Winter of Code program.",
    icon: Award,
  },
  {
    title: "Open Source Contributor – ECWoC",
    description: "Contributed to open-source projects under mentorship, following industry-standard Git workflows.",
    icon: CheckCircle,
  },
  {
    title: "Community Contribution Certificate Holder",
    description: "Awarded a certificate for meaningful contributions to community-driven open-source projects.",
    icon: Award,
  },
];

export default function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="section-padding max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Recognition</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">
          My <span className="gradient-text">Achievements</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {achievements.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
