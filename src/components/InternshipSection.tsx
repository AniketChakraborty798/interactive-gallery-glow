import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, ExternalLink, ImageIcon, FileText, X } from "lucide-react";
import ecwocBanner from "@/assets/ecwoc-banner.png";
import ecwocIdCard from "@/assets/ecwoc-id-card.png";
import ecwocContributor from "@/assets/ecwoc-contributor-card.jpeg";

const internships = [
  {
    company: "InterviewGod",
    role: "Personal Assistant to the CEO",
    type: "Full-Time, On-site",
    duration: "Jul 2024 – Present (1 Year 8 Months)",
    location: "Bengaluru, Karnataka, India",
    description:
      "Worked closely with the CEO in managing operations, communication, technical coordination, and support activities. Contributed to strategic planning, handled internal documentation, and supported business development initiatives in an AI-driven hiring platform.",
    technologies: ["Communication", "Technical Support", "Operations Management", "Coordination"],
    proofImages: [],
    proofPdfs: [
      { href: "/proofs/Aniket_BD.pdf", label: "Certificate" },
      { href: "/proofs/internship_offer_letter.pdf", label: "Internship Offer Letter" },
    ],
  },
  {
    company: "Elite Coders",
    role: "Open Source Contributor",
    type: "Part-Time, Remote",
    duration: "Dec 2025 – Present",
    description:
      "Actively contributing to real-world open-source projects by collaborating with mentors and developers. Following industry-standard coding practices, Git workflows, and contribution guidelines while improving problem-solving and teamwork skills.",
    technologies: ["HTML5", "CSS", "Git", "GitHub", "JavaScript"],
    proofImages: [
      { src: ecwocBanner, alt: "ECWoC Participant Banner" },
      { src: ecwocIdCard, alt: "Verified ECWoC Participant ID Card" },
      { src: ecwocContributor, alt: "ECWoC 2026 Contributor ID Card" },
    ],
    proofPdfs: [],
  },
];

export default function InternshipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

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
              {item.location && (
                <p className="text-muted-foreground text-xs mb-1">{item.location}</p>
              )}
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

              {/* Proof images */}
              {item.proofImages && item.proofImages.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <ImageIcon size={12} /> Proof & Certificates
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {item.proofImages.map((img) => (
                      <motion.button
                        key={img.alt}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setLightbox(img.src)}
                        className="rounded-lg overflow-hidden border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        <img src={img.src} alt={img.alt} className="h-20 md:h-24 w-auto object-cover" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Proof PDFs */}
              {item.proofPdfs && item.proofPdfs.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <FileText size={12} /> Documents
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {item.proofPdfs.map((pdf) => (
                      <a
                        key={pdf.label}
                        href={pdf.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg border border-border/50 hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        <FileText size={14} />
                        {pdf.label}
                        <ExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-secondary transition-colors z-10"
              >
                <X size={16} />
              </button>
              <img src={lightbox} alt="Proof" className="rounded-lg max-h-[85vh] w-auto object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
