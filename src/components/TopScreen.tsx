"use client";

import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

export default function TopScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Gavel icon */}
        <motion.div
          className="text-7xl"
          initial={{ rotate: -20 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          ⚖️
        </motion.div>

        <h1 className="text-4xl font-black tracking-wider text-gold">
          ワリカン裁判所
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed">
          飲み会の割り勘金額を
          <br />
          <span className="text-gold-light font-bold">公正に判決</span>
          します
        </p>

        <motion.button
          onClick={onStart}
          className="mt-8 px-10 py-4 bg-dark-red text-white font-bold text-lg rounded-lg
                     border-2 border-gold hover:bg-red-900 transition-colors cursor-pointer"
          whileTap={{ scale: 0.95 }}
        >
          開廷する
        </motion.button>

        <p className="text-xs text-gray-600 mt-4">
          ※ 判決に法的効力はありません
        </p>
      </motion.div>
    </div>
  );
}
