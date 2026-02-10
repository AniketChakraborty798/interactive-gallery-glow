import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
    </section>
  );
}
