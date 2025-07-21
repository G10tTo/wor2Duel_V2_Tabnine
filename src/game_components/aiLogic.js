import { getPossibleWords } from './dictionary';

export const generateAIMove = async (sequence) => {
  const possible = await getPossibleWords(sequence);

  if (possible.length === 0) {
    return null;
  }

  const nextLetters = possible.map(w => w[sequence.length]).filter(Boolean);

  if (nextLetters.length === 0) {
    return null;
  }

  const nextLetter = nextLetters[Math.floor(Math.random() * nextLetters.length)];
  return nextLetter.toLowerCase();
};