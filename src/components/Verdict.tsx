"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import type { VerdictResult } from "@/lib/verdict";
import { CONDITIONS, COURT_NAME, ACCOUNT_HANDLE } from "@/lib/constants";

interface Props {
  results: VerdictResult[];
  totalAmount: number;
  onReset: () => void;
}

function getConditionEmoji(condition: string): string {
  return CONDITIONS.find((c) => c.value === condition)?.emoji ?? "";
}

function formatDate(): string {
  const d = new Date();
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function Verdict({ results, totalAmount, onReset }: Props) {
  const verdictRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!verdictRef.current) return;
    try {
      const dataUrl = await toPng(verdictRef.current, {
        backgroundColor: "#0a0a0a",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = "warikan-verdict.png";
      link.href = dataUrl;
      link.click();
    } catch {
      // ignore
    }
  }, []);

  const handleLineShare = useCallback(() => {
    const text = results
      .map((r) => `${r.name}: ¥${r.amount.toLocaleString()}`)
      .join("\n");
    const message = `⚖️ ワリカン裁判所 判決 ⚖️\n\n${text}\n\n合計: ¥${totalAmount.toLocaleString()}\n\n判決はこちら👇`;
    const url = typeof window !== "undefined" ? window.location.href : "";
    const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(
      message + "\n" + url + "?utm_source=line&utm_medium=share"
    )}`;
    window.open(lineUrl, "_blank");
  }, [results, totalAmount]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-dvh px-4 py-8 flex flex-col items-center"
    >
      {/* Verdict document */}
      <div
        ref={verdictRef}
        className="w-full max-w-md p-6 court-border rounded-lg bg-[#0a0a0a] relative"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-gold text-sm tracking-[0.3em] mb-1">
            {COURT_NAME}
          </p>
          <h2 className="text-3xl font-black text-white tracking-[0.5em]">
            判決文
          </h2>
        </div>

        {/* Main verdict */}
        <div className="mb-6">
          <h3 className="text-gold font-bold text-lg mb-3 border-b border-gold/30 pb-1">
            【主文】
          </h3>
          <div className="space-y-2">
            {results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="flex justify-between items-center text-white"
              >
                <span>
                  {getConditionEmoji(r.condition)} 被告人{r.name}
                </span>
                <span className="font-bold text-lg">
                  ¥{r.amount.toLocaleString()}{" "}
                  <span className="text-sm text-gray-400">の刑</span>
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-700 text-right text-gray-400 text-sm">
            合計: ¥{totalAmount.toLocaleString()}
          </div>
        </div>

        {/* Reasons */}
        <div className="mb-6">
          <h3 className="text-gold font-bold text-lg mb-3 border-b border-gold/30 pb-1">
            【理由】
          </h3>
          <div className="space-y-2 text-sm text-gray-300">
            {results.map((r, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <span className="text-white font-medium">{r.name}</span>：
                {r.comment}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 space-y-1 mt-8">
          <p>{formatDate()}</p>
          <p>{COURT_NAME}</p>
          <motion.div
            className="inline-block mt-2 stamp-animate"
            initial={{ scale: 3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          >
            <span className="text-dark-red font-black text-2xl border-2 border-dark-red px-3 py-1 rounded">
              判決
            </span>
          </motion.div>
          <p className="text-gold mt-2">{ACCOUNT_HANDLE}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full max-w-md mt-6 space-y-3">
        <button
          onClick={handleDownload}
          className="w-full py-3 bg-gray-800 text-white font-bold rounded-lg
                     border border-gray-600 hover:bg-gray-700 transition-colors cursor-pointer"
        >
          📸 画像を保存
        </button>

        <button
          onClick={handleLineShare}
          className="w-full py-3 bg-[#06C755] text-white font-bold rounded-lg
                     hover:bg-[#05b34d] transition-colors cursor-pointer"
        >
          💬 LINEで送る
        </button>

        <button
          onClick={onReset}
          className="w-full py-3 bg-transparent text-gray-400 font-medium rounded-lg
                     border border-gray-700 hover:text-white hover:border-gray-500
                     transition-colors cursor-pointer"
        >
          🔁 もう一回やる
        </button>
      </div>

      {/* Nudge */}
      <div className="mt-8 text-center text-sm text-gray-500 max-w-xs">
        <p>飲み会代、時給高いバイトなら気にならないかも？</p>
        <p className="text-gold mt-1">{ACCOUNT_HANDLE}</p>
      </div>
    </motion.div>
  );
}
