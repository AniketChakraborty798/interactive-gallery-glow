import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function CompanionBirdSVG() {
  return (
    <motion.svg
      width={44}
      height={22}
      viewBox="0 0 40 20"
      fill="none"
    >
      {/* Left wing */}
      <motion.path
        d="M20 10 Q10 0 0 5"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M20 10 Q10 0 0 5", "M20 10 Q10 14 0 12", "M20 10 Q10 0 0 5"] }}
        transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Right wing */}
      <motion.path
        d="M20 10 Q30 0 40 5"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M20 10 Q30 0 40 5", "M20 10 Q30 14 40 12", "M20 10 Q30 0 40 5"] }}
        transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Body */}
      <circle cx="20" cy="10" r="2" fill="hsl(var(--primary))" opacity="0.8" />
    </motion.svg>
  );
}

export default function ScrollCompanionBird() {
  const [pageHeight, setPageHeight] = useState(1);
  const scrollY = useMotionValue(0);
  const smoothY = useSpring(scrollY, { stiffness: 60, damping: 20 });

  // Horizontal sway based on scroll
  const swayX = useTransform(smoothY, (v) => Math.sin(v * 0.003) * 30 + 48);

  useEffect(() => {
    const updateScroll = () => {
      scrollY.set(window.scrollY);
      setPageHeight(document.documentElement.scrollHeight - window.innerHeight || 1);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [scrollY]);

  // Bird Y position tracks viewport scroll percentage, staying within view
  const birdY = useTransform(smoothY, [0, pageHeight], [80, window.innerHeight - 80]);

  return (
    <motion.div
      className="fixed z-[90] pointer-events-none"
      style={{ top: birdY, left: swayX }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <CompanionBirdSVG />
      </motion.div>
    </motion.div>
  );
}
