import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ThemeMaskToggle() {
  const [isOrange, setIsOrange] = useState(false);
  const [maskStyle, setMaskStyle] = useState<React.CSSProperties>({});
  const [revealing, setRevealing] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(() => {
    if (revealing) return;

    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Calculate max radius to cover full screen
    const maxRadius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    setMaskStyle({
      left: cx,
      top: cy,
      width: maxRadius * 2,
      height: maxRadius * 2,
      marginLeft: -maxRadius,
      marginTop: -maxRadius,
    });

    setRevealing(true);

    // After animation completes, apply theme and remove overlay
    setTimeout(() => {
      const next = !isOrange;
      setIsOrange(next);
      document.documentElement.setAttribute("data-theme", next ? "orange" : "");
      setRevealing(false);
    }, 600);
  }, [isOrange, revealing]);

  return (
    <>
      {/* Reveal overlay */}
      <AnimatePresence>
        {revealing && (
          <motion.div
            className="fixed inset-0 z-[999] pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                ...maskStyle,
                backgroundColor: isOrange
                  ? "hsl(220 20% 4%)"       // revealing back to dark
                  : "hsl(25 20% 6%)",        // revealing orange theme
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        ref={btnRef}
        onClick={handleToggle}
        className="fixed bottom-6 left-6 z-[100] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border border-border/50 backdrop-blur-md shadow-lg"
        style={{
          background: isOrange
            ? "linear-gradient(135deg, hsl(30 90% 55%), hsl(15 85% 50%))"
            : "var(--gradient-primary)",
        }}
        whileHover={{ scale: 1.15, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        title="Toggle theme"
      >
        <Sparkles className="w-5 h-5 text-primary-foreground" />
      </motion.button>
    </>
  );
}
