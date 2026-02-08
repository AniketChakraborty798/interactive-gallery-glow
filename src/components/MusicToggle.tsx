import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

function createAmbientMusic(audioCtx: AudioContext) {
  const masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  masterGain.connect(audioCtx.destination);

  const noteFreqs = [174.61, 220, 261.63, 329.63, 392];
  const allNodes: (OscillatorNode | AudioBufferSourceNode)[] = [];

  // Ambient pad oscillators
  noteFreqs.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.detune.setValueAtTime((i - 2) * 5, audioCtx.currentTime);

    // Slow LFO for gentle movement
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.08 + i * 0.04, audioCtx.currentTime);
    lfoGain.gain.setValueAtTime(3, audioCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(600 + i * 150, audioCtx.currentTime);
    filter.Q.setValueAtTime(0.8, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.035, audioCtx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start();
    lfo.start();
    allNodes.push(osc, lfo);
  });

  // Subtle noise texture
  const bufferSize = audioCtx.sampleRate * 2;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;
  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = "lowpass";
  noiseFilter.frequency.setValueAtTime(350, audioCtx.currentTime);
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.006, audioCtx.currentTime);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noise.start();
  allNodes.push(noise);

  return {
    fadeIn: () => {
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 2);
    },
    fadeOut: () => {
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.5);
    },
    destroy: () => {
      allNodes.forEach((n) => {
        try { n.stop(); } catch {}
      });
      masterGain.disconnect();
    },
  };
}

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicRef = useRef<ReturnType<typeof createAmbientMusic> | null>(null);

  const toggle = useCallback(() => {
    // Initialize once
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      // Turn OFF — fade out
      musicRef.current?.fadeOut();
      setIsPlaying(false);
    } else {
      // Turn ON — create fresh nodes if needed, then fade in
      if (!musicRef.current) {
        musicRef.current = createAmbientMusic(audioCtxRef.current);
      }
      musicRef.current.fadeIn();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      musicRef.current?.destroy();
      audioCtxRef.current?.close();
    };
  }, []);

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
