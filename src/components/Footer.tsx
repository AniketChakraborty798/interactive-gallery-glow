import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-muted-foreground text-sm">
          © Aniket Chakraborty's Portfolio
        </p>

        <div className="flex items-center gap-4">
          {[
            { Icon: Github, href: "https://github.com/AniketChakraborty798" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/aniket-chakraborty-59505a298/" },
            { Icon: Twitter, href: "https://x.com/AniketXi" },
          ].map(({ Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
