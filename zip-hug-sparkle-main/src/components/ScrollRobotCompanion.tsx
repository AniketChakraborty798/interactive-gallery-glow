import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

function RobotSVG() {
  return (
    <svg width="72" height="84" viewBox="0 0 48 56" fill="none">
      {/* Antenna */}
      <motion.line
        x1="24" y1="8" x2="24" y2="0"
        stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"
      />
      <motion.circle
        cx="24" cy="0" r="3"
        fill="hsl(var(--primary))"
        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Head */}
      <rect x="8" y="8" width="32" height="24" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />

      {/* Eyes */}
      <motion.circle
        cx="17" cy="20" r="3.5"
        fill="hsl(var(--primary))"
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />
      <motion.circle
        cx="31" cy="20" r="3.5"
        fill="hsl(var(--primary))"
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Mouth */}
      <rect x="18" y="26" width="12" height="2" rx="1" fill="hsl(var(--primary))" opacity="0.6" />

      {/* Body */}
      <rect x="12" y="34" width="24" height="16" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />

      {/* Body detail */}
      <circle cx="24" cy="42" r="3" fill="hsl(var(--primary))" opacity="0.4" />

      {/* Arms */}
      <motion.rect
        x="2" y="36" width="8" height="4" rx="2"
        fill="hsl(var(--primary))" opacity="0.7"
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "100%", originY: "50%" }}
      />
      <motion.rect
        x="38" y="36" width="8" height="4" rx="2"
        fill="hsl(var(--primary))" opacity="0.7"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "0%", originY: "50%" }}
      />

      {/* Feet */}
      <rect x="14" y="52" width="6" height="4" rx="2" fill="hsl(var(--primary))" opacity="0.6" />
      <rect x="28" y="52" width="6" height="4" rx="2" fill="hsl(var(--primary))" opacity="0.6" />
    </svg>
  );
}

export default function ScrollRobotCompanion() {
  const [showBubble, setShowBubble] = useState(false);
  const [pageHeight, setPageHeight] = useState(1);
  const scrollY = useMotionValue(0);
  const smoothY = useSpring(scrollY, { stiffness: 60, damping: 20 });

  const swayX = useTransform(smoothY, (v) => Math.sin(v * 0.004) * 15);

  useEffect(() => {
    const update = () => {
      scrollY.set(window.scrollY);
      setPageHeight(document.documentElement.scrollHeight - window.innerHeight || 1);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollY]);

  const robotY = useTransform(smoothY, [0, pageHeight], [100, window.innerHeight - 100]);

  return (
    <motion.div
      className="fixed right-4 z-[90] cursor-pointer"
      style={{ top: robotY, x: swayX }}
      onClick={() => setShowBubble((p) => !p)}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-16 right-0 bg-card border border-border rounded-xl px-4 py-2 shadow-lg whitespace-nowrap"
            style={{ boxShadow: "var(--glow-primary)" }}
          >
            <p className="text-sm font-mono text-foreground">
              Hi 👋 I'm <span className="gradient-text font-semibold">Aniket's Assistant</span>
            </p>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <RobotSVG />
      </motion.div>
    </motion.div>
  );
}
