import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onStart: () => void;
  visible: boolean;
}

function useTypewriter(text: string, speed = 100, delay = 300) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

function TypewriterText() {
  const { displayed: welcomeText, done: welcomeDone } = useTypewriter("Welcome", 120, 300);
  const { displayed: subtitleText } = useTypewriter("Portfolio Experience", 60, 1200);

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-display text-3xl md:text-5xl font-bold gradient-text mb-3"
      >
        {welcomeText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 align-middle"
          style={{ display: welcomeDone ? "none" : "inline-block" }}
        />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-muted-foreground text-sm md:text-base mb-10 tracking-widest uppercase font-mono"
      >
        {subtitleText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[2px] h-[0.7em] bg-muted-foreground ml-1 align-middle"
          style={{ display: subtitleText.length >= 20 ? "none" : "inline-block" }}
        />
      </motion.p>
    </>
  );
}

export default function SplashScreen({ onStart, visible }: SplashScreenProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Orbital rings */}
          <div className="relative mb-12">
            <motion.div
              className="w-32 h-32 rounded-full border border-primary/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <motion.div
              className="absolute inset-2 rounded-full border border-accent/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <motion.div
              className="absolute inset-6 rounded-full border border-primary/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/60"
              />
            </motion.div>

            {/* Center glow */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-4 h-4 rounded-full bg-primary/40 blur-md" />
            </motion.div>
          </div>

          {/* Typewriter Text */}
          <TypewriterText />

          {/* Start button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(174 72% 56% / 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="relative px-10 py-4 rounded-full font-display font-semibold text-lg tracking-wide text-primary-foreground overflow-hidden group cursor-pointer"
            style={{ background: "var(--gradient-primary)" }}
          >
            <span className="relative z-10">Enter</span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(280 60% 65%), hsl(174 72% 56%))",
              }}
            />
          </motion.button>

          {/* Subtle hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-6 text-muted-foreground/50 text-xs font-mono"
          >
            Click to explore
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
