export type ParticipantCondition =
  | "normal"
  | "light"
  | "late"
  | "heavy"
  | "organizer";

export const CONDITIONS: {
  value: ParticipantCondition;
  label: string;
  emoji: string;
  coefficient: number;
} [] = [
  { value: "normal", label: "普通", emoji: "😐", coefficient: 1.0 },
  { value: "light", label: "飲んでない / 少食", emoji: "🥗", coefficient: 0.6 },
  { value: "late", label: "遅れてきた", emoji: "🕐", coefficient: 0.7 },
  { value: "heavy", label: "めちゃくちゃ食べた / 飲んだ", emoji: "🍖", coefficient: 1.5 },
  { value: "organizer", label: "幹事", emoji: "📋", coefficient: 0.8 },
];

export const VERDICT_COMMENTS: Record<ParticipantCondition, string[]> = {
  normal: [
    "特記事項なし。規定通りの支払いを命ずる。",
    "平穏なる飲食行為を確認。標準額の支払いを命ずる。",
    "特段の事情なし。粛々と支払うべし。",
  ],
  light: [
    "飲酒を拒否した罪により、減額の恩赦を与える。",
    "少食の情状を酌量し、減額判決とする。",
    "ウーロン茶勢の権利を認め、減額を命ずる。",
  ],
  late: [
    "遅刻の罪により、やや減額の温情判決とする。",
    "到着遅延の情状を考慮し、一部減額を認める。",
    "遅刻常習の疑いあるも、今回は温情をもって減額とする。",
  ],
  heavy: [
    "暴食の罪により、追加徴収の刑に処す。",
    "飲み放題を私物化した罪は重い。追加徴収を命ずる。",
    "胃袋の限界に挑戦した功罪を認め、増額判決とする。",
  ],
  organizer: [
    "幹事という苦行を遂行した功績により、減刑とする。",
    "予約・会計・連絡という三重苦を考慮し、減額を命ずる。",
    "幹事の労に報い、割引判決を下す。",
  ],
};

export const COURT_NAME = "ワリカン裁判所 第一法廷";
export const ACCOUNT_HANDLE = "@gakusa_staff";
