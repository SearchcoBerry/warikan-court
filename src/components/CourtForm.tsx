"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONDITIONS, type ParticipantCondition } from "@/lib/constants";
import type { Participant } from "@/lib/verdict";

interface Props {
  onSubmit: (totalAmount: number, participants: Participant[]) => void;
}

interface FormParticipant {
  name: string;
  condition: ParticipantCondition;
}

export default function CourtForm({ onSubmit }: Props) {
  const [totalAmount, setTotalAmount] = useState("");
  const [participants, setParticipants] = useState<FormParticipant[]>([
    { name: "", condition: "normal" },
    { name: "", condition: "normal" },
  ]);

  const addParticipant = () => {
    if (participants.length >= 10) return;
    setParticipants([...participants, { name: "", condition: "normal" }]);
  };

  const removeParticipant = (index: number) => {
    if (participants.length <= 2) return;
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const updateParticipant = (
    index: number,
    field: keyof FormParticipant,
    value: string
  ) => {
    const updated = [...participants];
    if (field === "condition") {
      updated[index] = { ...updated[index], condition: value as ParticipantCondition };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setParticipants(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(totalAmount, 10);
    if (isNaN(amount) || amount <= 0) return;

    const named = participants.map((p, i) => ({
      name: p.name.trim() || `被告人${i + 1}`,
      condition: p.condition,
    }));

    onSubmit(amount, named);
  };

  const isValid =
    totalAmount &&
    parseInt(totalAmount, 10) > 0 &&
    participants.length >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-dvh px-4 py-8 flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold text-gold mb-2">訴状提出</h2>
      <p className="text-sm text-gray-400 mb-6">飲み会の情報を入力してください</p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6"
      >
        {/* Total amount */}
        <div>
          <label className="block text-sm font-medium text-gold mb-1">
            合計金額（円）
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="10000"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg
                       text-white text-lg focus:border-gold focus:outline-none"
          />
        </div>

        {/* Participants */}
        <div>
          <label className="block text-sm font-medium text-gold mb-3">
            参加者（{participants.length}人）
          </label>

          <AnimatePresence>
            {participants.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 p-3 bg-gray-900 border border-gray-800 rounded-lg"
              >
                <div className="flex gap-2 items-center mb-2">
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) =>
                      updateParticipant(i, "name", e.target.value)
                    }
                    placeholder={`被告人${i + 1}`}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded
                               text-white text-sm focus:border-gold focus:outline-none"
                  />
                  {participants.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeParticipant(i)}
                      className="text-gray-500 hover:text-red-400 text-lg px-2 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <select
                  value={p.condition}
                  onChange={(e) =>
                    updateParticipant(i, "condition", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded
                             text-white text-sm focus:border-gold focus:outline-none cursor-pointer"
                >
                  {CONDITIONS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.emoji} {c.label}
                    </option>
                  ))}
                </select>
              </motion.div>
            ))}
          </AnimatePresence>

          {participants.length < 10 && (
            <button
              type="button"
              onClick={addParticipant}
              className="w-full py-2 border border-dashed border-gray-600 rounded-lg
                         text-gray-400 hover:text-gold hover:border-gold transition-colors
                         text-sm cursor-pointer"
            >
              + 参加者を追加
            </button>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={!isValid}
          className="w-full py-4 bg-dark-red text-white font-bold text-lg rounded-lg
                     border-2 border-gold disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-red-900 transition-colors cursor-pointer"
          whileTap={isValid ? { scale: 0.97 } : {}}
        >
          審議を開始する
        </motion.button>
      </form>
    </motion.div>
  );
}
