import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import myPic from "@/assets/photo_1.jpeg.asset.json";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
      >
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-accent opacity-60 blur-md group-hover:opacity-80 transition-opacity" />
            <img
              src={myPic.url}
              alt="Aniket Chakraborty"
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-background shadow-xl"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <div>
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">About Me</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Passionate about creating <span className="gradient-text">beautiful</span> things
          </h2>

          <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
            I'm a Python Full-Stack Developer and Data Analyst with a background in Electrical Engineering. I build scalable web applications, analyze data to extract meaningful insights, and enjoy solving real-world problems at the intersection of software, data, and engineering. With a strong foundation in logic, systems, and analytics, I focus on writing clean code and creating efficient, user-focused solutions.
          </p>
        </div>
      </motion.div>
    </section>
  );
}