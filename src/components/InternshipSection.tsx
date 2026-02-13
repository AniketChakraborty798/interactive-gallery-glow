import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, ExternalLink } from "lucide-react";

const internships = [
  {
    company: "Elite Coders",
    role: "Open Source Contributor",
    type: "Part-Time, Remote",
    duration: "Dec 2025 – Present",
    description:
      "Actively contributing to real-world open-source projects by collaborating with mentors and developers. Following industry-standard coding practices, Git workflows, and contribution guidelines while improving problem-solving and teamwork skills.",
    technologies: ["HTML5", "CSS", "Git", "GitHub", "JavaScript"],
  },
];

export default function InternshipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="internship" className="section-padding max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Experience</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">
          My <span className="gradient-text">Internship</span>
        </h2>
      </motion.div>

      <div className="space-y-8">
        {internships.map((item, i) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 * i }}
            className="glass-card p-6 md:p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />
            <div className="pl-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
                <div className="flex items-center gap-3">
                  <Briefcase size={20} className="text-primary" />
                  <h3 className="font-display text-xl font-semibold">{item.company}</h3>
                </div>
                <span className="text-sm text-muted-foreground font-mono">{item.duration}</span>
              </div>
              <p className="text-primary/80 text-sm font-medium mb-1">
                {item.role} · {item.type}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
