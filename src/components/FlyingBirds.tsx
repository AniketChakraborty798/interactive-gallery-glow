import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Bird {
  id: number;
  startX: number;
  startY: number;
  size: number;
  duration: number;
  delay: number;
  direction: 1 | -1;
  flapSpeed: number;
  yWave: number;
}

function BirdSVG({ size, flapSpeed }: { size: number; flapSpeed: number }) {
  return (
    <motion.svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 40 20"
      fill="none"
      className="opacity-40"
    >
      {/* Left wing */}
      <motion.path
        d="M20 10 Q10 0 0 5"
        stroke="hsl(174, 72%, 56%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M20 10 Q10 0 0 5", "M20 10 Q10 14 0 12", "M20 10 Q10 0 0 5"] }}
        transition={{ duration: flapSpeed, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Right wing */}
      <motion.path
        d="M20 10 Q30 0 40 5"
        stroke="hsl(174, 72%, 56%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M20 10 Q30 0 40 5", "M20 10 Q30 14 40 12", "M20 10 Q30 0 40 5"] }}
        transition={{ duration: flapSpeed, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Body */}
      <circle cx="20" cy="10" r="1.5" fill="hsl(174, 72%, 56%)" opacity="0.6" />
    </motion.svg>
  );
}

function AccentBirdSVG({ size, flapSpeed }: { size: number; flapSpeed: number }) {
  return (
    <motion.svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 40 20"
      fill="none"
      className="opacity-30"
    >
      <motion.path
        d="M20 10 Q10 2 0 6"
        stroke="hsl(280, 60%, 65%)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M20 10 Q10 2 0 6", "M20 10 Q10 15 0 13", "M20 10 Q10 2 0 6"] }}
        transition={{ duration: flapSpeed, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M20 10 Q30 2 40 6"
        stroke="hsl(280, 60%, 65%)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M20 10 Q30 2 40 6", "M20 10 Q30 15 40 13", "M20 10 Q30 2 40 6"] }}
        transition={{ duration: flapSpeed, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="20" cy="10" r="1.2" fill="hsl(280, 60%, 65%)" opacity="0.5" />
    </motion.svg>
  );
}

export default function FlyingBirds() {
  const [dimensions, setDimensions] = useState({ w: window.innerWidth, h: document.body.scrollHeight });

  useEffect(() => {
    const update = () => setDimensions({ w: window.innerWidth, h: document.body.scrollHeight });
    window.addEventListener("resize", update);
    const interval = setInterval(update, 3000);
    return () => {
      window.removeEventListener("resize", update);
      clearInterval(interval);
    };
  }, []);

  const birds = useMemo<Bird[]>(() => {
    const count = 18;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      startX: Math.random() > 0.5 ? -80 : dimensions.w + 80,
      startY: Math.random() * dimensions.h * 0.85 + dimensions.h * 0.05,
      size: 28 + Math.random() * 24,
      duration: 18 + Math.random() * 22,
      delay: Math.random() * 20,
      direction: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
      flapSpeed: 0.3 + Math.random() * 0.4,
      yWave: 30 + Math.random() * 80,
    }));
  }, [dimensions.w, dimensions.h]);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none overflow-hidden" aria-hidden="true">
      {birds.map((bird) => {
        const fromLeft = bird.direction === 1;
        const xStart = fromLeft ? -100 : dimensions.w + 100;
        const xEnd = fromLeft ? dimensions.w + 100 : -100;
        const isAccent = bird.id % 3 === 0;

        return (
          <motion.div
            key={bird.id}
            className="absolute"
            style={{ top: bird.startY, left: 0, scaleX: bird.direction }}
            animate={{
              x: [xStart, (xStart + xEnd) / 2, xEnd],
              y: [0, -bird.yWave, 0],
            }}
            transition={{
              duration: bird.duration,
              delay: bird.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {isAccent ? (
              <AccentBirdSVG size={bird.size} flapSpeed={bird.flapSpeed} />
            ) : (
              <BirdSVG size={bird.size} flapSpeed={bird.flapSpeed} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
