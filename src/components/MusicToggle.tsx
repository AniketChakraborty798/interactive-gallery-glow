import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import backgroundMusic from "@/assets/background-music.mpeg";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const fadeAudio = useCallback((audio: HTMLAudioElement, targetVolume: number, duration: number) => {
    const steps = 30;
    const stepTime = duration / steps;
    const volumeStep = (targetVolume - audio.volume) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(1, Math.max(0, audio.volume + volumeStep));
      if (currentStep >= steps) {
        clearInterval(interval);
        audio.volume = targetVolume;
      }
    }, stepTime);
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      fadeAudio(audio, 0, 1000);
      setTimeout(() => audio.pause(), 1000);
      setIsPlaying(false);
    } else {
      audio.play();
      fadeAudio(audio, 0.7, 1500);
      setIsPlaying(true);
    }
  }, [isPlaying, fadeAudio]);

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center cursor-pointer group border border-border/50 hover:border-primary/50 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? "Turn off music" : "Turn on music"}
      title={isPlaying ? "Turn off music" : "Turn on music"}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Volume2 size={20} className="text-primary" />
            <motion.div
              className="absolute -inset-2 rounded-full border border-primary/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="muted"
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <VolumeX size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
