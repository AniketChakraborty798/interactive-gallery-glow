import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

// Royalty-free ambient loop (Base64-encoded short sine tone as fallback, replaced by Web Audio API)
function createAmbientMusic(audioCtx: AudioContext): { start: () => void; stop: () => void } {
  let playing = false;
  let nodes: { osc: OscillatorNode; gain: GainNode }[] = [];

  const noteFreqs = [174.61, 220, 261.63, 329.63, 392]; // F3, A3, C4, E4, G4

  const start = () => {
    if (playing) return;
    playing = true;

    // Create a lush ambient pad
    noteFreqs.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Subtle detuning for warmth
      osc.detune.setValueAtTime((i - 2) * 5, audioCtx.currentTime);

      // Very slow LFO for movement
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.1 + i * 0.05, audioCtx.currentTime);
      lfoGain.gain.setValueAtTime(3, audioCtx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800 + i * 200, audioCtx.currentTime);
      filter.Q.setValueAtTime(1, audioCtx.currentTime);

      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 2 + i * 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();

      nodes.push({ osc, gain });
    });

    // Add a subtle noise layer for texture
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const noiseGain = audioCtx.createGain();
    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(400, audioCtx.currentTime);
    noiseGain.gain.setValueAtTime(0, audioCtx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.008, audioCtx.currentTime + 3);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    noise.start();
  };

  const stop = () => {
    if (!playing) return;
    playing = false;
    const now = audioCtx.currentTime;
    nodes.forEach(({ osc, gain }) => {
      gain.gain.linearRampToValueAtTime(0, now + 1.5);
      osc.stop(now + 2);
    });
    nodes = [];
  };

  return { start, stop };
}

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicRef = useRef<{ start: () => void; stop: () => void } | null>(null);

  const toggle = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
      musicRef.current = createAmbientMusic(audioCtxRef.current);
    }

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      musicRef.current?.stop();
      // Recreate for next play
      musicRef.current = createAmbientMusic(audioCtxRef.current);
    } else {
      musicRef.current?.start();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      musicRef.current?.stop();
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center cursor-pointer group border border-border/50 hover:border-primary/50 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? "Mute music" : "Play music"}
      title={isPlaying ? "Mute music" : "Play music"}
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
            {/* Animated sound waves */}
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
