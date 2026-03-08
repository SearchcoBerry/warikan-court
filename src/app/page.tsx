"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import TopScreen from "@/components/TopScreen";
import CourtForm from "@/components/CourtForm";
import CourtAnimation from "@/components/CourtAnimation";
import Verdict from "@/components/Verdict";
import { calculateVerdict, type Participant, type VerdictResult } from "@/lib/verdict";

type Step = "top" | "form" | "animation" | "verdict";

export default function Home() {
  const [step, setStep] = useState<Step>("top");
  const [results, setResults] = useState<VerdictResult[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleStart = useCallback(() => setStep("form"), []);

  const handleSubmit = useCallback(
    (amount: number, participants: Participant[]) => {
      setTotalAmount(amount);
      const verdictResults = calculateVerdict(amount, participants);
      setResults(verdictResults);
      setStep("animation");
    },
    []
  );

  const handleAnimationComplete = useCallback(() => setStep("verdict"), []);

  const handleReset = useCallback(() => {
    setStep("top");
    setResults([]);
    setTotalAmount(0);
  }, []);

  return (
    <main className="max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {step === "top" && <TopScreen key="top" onStart={handleStart} />}
        {step === "form" && <CourtForm key="form" onSubmit={handleSubmit} />}
        {step === "animation" && (
          <CourtAnimation key="animation" onComplete={handleAnimationComplete} />
        )}
        {step === "verdict" && (
          <Verdict
            key="verdict"
            results={results}
            totalAmount={totalAmount}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
