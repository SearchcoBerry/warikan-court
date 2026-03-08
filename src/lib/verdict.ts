import {
  CONDITIONS,
  VERDICT_COMMENTS,
  type ParticipantCondition,
} from "./constants";

export interface Participant {
  name: string;
  condition: ParticipantCondition;
}

export interface VerdictResult {
  name: string;
  condition: ParticipantCondition;
  amount: number;
  comment: string;
}

function getCoefficient(condition: ParticipantCondition): number {
  return CONDITIONS.find((c) => c.value === condition)?.coefficient ?? 1.0;
}

function getRandomComment(condition: ParticipantCondition): string {
  const comments = VERDICT_COMMENTS[condition];
  return comments[Math.floor(Math.random() * comments.length)];
}

function roundTo100(n: number): number {
  return Math.round(n / 100) * 100;
}

export function calculateVerdict(
  totalAmount: number,
  participants: Participant[]
): VerdictResult[] {
  const coefficients = participants.map((p) => getCoefficient(p.condition));
  const totalCoefficient = coefficients.reduce((sum, c) => sum + c, 0);

  // Calculate raw amounts based on coefficient ratio
  const rawAmounts = coefficients.map(
    (c) => (c / totalCoefficient) * totalAmount
  );

  // Round to 100 yen
  const roundedAmounts = rawAmounts.map(roundTo100);

  // Fix rounding error: assign difference to the heaviest eater
  const roundedTotal = roundedAmounts.reduce((sum, a) => sum + a, 0);
  const diff = totalAmount - roundedTotal;

  if (diff !== 0) {
    // Find the person with the highest coefficient (heaviest eater)
    let maxIdx = 0;
    let maxCoeff = 0;
    coefficients.forEach((c, i) => {
      if (c > maxCoeff) {
        maxCoeff = c;
        maxIdx = i;
      }
    });
    roundedAmounts[maxIdx] += diff;
  }

  return participants.map((p, i) => ({
    name: p.name,
    condition: p.condition,
    amount: roundedAmounts[i],
    comment: getRandomComment(p.condition),
  }));
}
