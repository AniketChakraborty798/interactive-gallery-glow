import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Zap } from "lucide-react";

const highlights = [
  { icon: Code2, title: "Clean Code", desc: "Writing maintainable, scalable code with modern best practices." },
  { icon: Palette, title: "Design Eye", desc: "Merging aesthetics with functionality for memorable interfaces." },
  { icon: Zap, title: "Performance", desc: "Optimized applications that load fast and run smooth." },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">About Me</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
          Passionate about creating <span className="gradient-text">beautiful</span> things
        </h2>

        <p className="text-muted-foreground text-lg max-w-3xl mb-16 leading-relaxed">
          I'm a Python Full-Stack Developer and Data Analyst with a background in Electrical Engineering. I build scalable web applications, analyze data to extract meaningful insights, and enjoy solving real-world problems at the intersection of software, data, and engineering. With a strong foundation in logic, systems, and analytics, I focus on writing clean code and creating efficient, user-focused solutions.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {highlights.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            className="glass-card glow-border p-8 group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <item.icon className="text-primary" size={24} />
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
