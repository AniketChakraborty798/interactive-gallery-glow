import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Three.js / WebGL", level: 85 },
  { name: "Node.js", level: 88 },
  { name: "Python", level: 80 },
  
  { name: "PostgreSQL", level: 82 },
  { name: "DevOps / CI/CD", level: 75 },
];

const techStack = [
  "React", "TypeScript", "Three.js", "Tailwind CSS", "Node.js", "PostgreSQL",
  "Docker", "AWS", "HTML", "CSS", "JavaScript", "Git", "GraphQL",
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Skills</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">
          My <span className="gradient-text">Expertise</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Skill bars */}
        <div className="space-y-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.2 + 0.1 * i, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="font-display text-2xl font-semibold mb-6">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + 0.05 * i }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-5 py-2.5 rounded-lg glass-card text-sm font-medium cursor-default hover:border-primary/50 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
