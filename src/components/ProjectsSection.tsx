import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import cricscoreLogo from "@/assets/cricscore-logo.png";

const projects = [
  {
    title: "CricScore Web App",
    description: "Live cricket scores, match updates, and stats — all in one place.",
    tags: ["TypeScript", "React", "HTML", "CSS"],
    color: "from-primary/20 to-accent/20",
    image: cricscoreLogo,
    github: "https://github.com/AniketChakraborty798/chakraborty",
    live: "https://elegant-sopapillas-eb5f33.netlify.app/",
  },
  {
    title: "AI Dashboard",
    description: "Real-time analytics platform with AI-powered insights and beautiful data visualization.",
    tags: ["React", "Three.js", "Python", "AI/ML"],
    color: "from-primary/20 to-accent/20",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack marketplace with seamless payments, inventory management, and smooth UX.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    color: "from-accent/20 to-primary/20",
  },
  {
    title: "Social Media App",
    description: "Mobile-first social platform with real-time messaging and content sharing capabilities.",
    tags: ["React Native", "Firebase", "WebSocket", "TypeScript"],
    color: "from-primary/20 to-accent/10",
  },
  {
    title: "3D Product Configurator",
    description: "Interactive 3D viewer for customizing products with real-time material and color changes.",
    tags: ["Three.js", "WebGL", "React", "GLSL"],
    color: "from-accent/10 to-primary/20",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Projects</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">
          Selected <span className="gradient-text">Works</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 * i }}
            className="glass-card overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Project image or gradient */}
            <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-contain p-4" />
              ) : (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
                  animate={hoveredIdx === i ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-4">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                    <ExternalLink size={18} className="text-primary" />
                  </a>
                )}
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                    <Github size={18} className="text-foreground" />
                  </a>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <Github size={18} className="text-foreground" />
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                  >
                    {tag}
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
