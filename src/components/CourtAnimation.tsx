"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const PHASES = [
  { text: "訴状を受理しました", duration: 1000 },
  { text: "証拠を精査中...", duration: 1200 },
  { text: "判事が協議中...", duration: 1200 },
  { text: "判決を下します", duration: 800 },
];

export default function CourtAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState(0);
  const [gavelStrike, setGavelStrike] = useState(false);

  useEffect(() => {
    let elapsed = 0;
    const timers: NodeJS.Timeout[] = [];

    PHASES.forEach((p, i) => {
      if (i > 0) {
        elapsed += PHASES[i - 1].duration;
        timers.push(setTimeout(() => setPhase(i), elapsed));
      }
    });

    elapsed += PHASES[PHASES.length - 1].duration;
    timers.push(setTimeout(() => setGavelStrike(true), elapsed));
    timers.push(setTimeout(() => onComplete(), elapsed + 800));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6">
      {/* Gavel */}
      <motion.div
        className={`text-8xl mb-8 ${gavelStrike ? "gavel-animate" : ""}`}
        animate={{ rotate: gavelStrike ? [0, -30, 5, 0] : 0 }}
        transition={{ duration: 0.4 }}
      >
        ⚖️
      </motion.div>

      {/* Phase text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl text-gold font-bold"
        >
          {PHASES[phase].text}
        </motion.p>
      </AnimatePresence>

      {/* Loading dots */}
      {!gavelStrike && (
        <div className="flex gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gold rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
