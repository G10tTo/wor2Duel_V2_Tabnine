import { useState, useCallback } from 'react';
import { isValidWord, getPossibleWords } from '../game_components/dictionary';

const useGameState = () => {
  const [sequence, setSequence] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [score, setScore] = useState({ user: 0, ai: 0 });
  const [rounds, setRounds] = useState([]);
  const [lastCompletedWord, setLastCompletedWord] = useState(null);

  const registerRound = useCallback(async (word, winner) => {
    const valid = await isValidWord(word);
    const round = { word, winner, valid };
    setRounds(prev => [...prev, round]);
    setLastCompletedWord(round);
    setScore(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
  }, []);

  const checkWordCompletion = useCallback(async (newSeq, player) => {
    if (newSeq.length >= 4 && await isValidWord(newSeq)) {
      await registerRound(newSeq, player);
      setCurrentPlayer(null); // End of round
      return true;
    }
    return false;
  }, [registerRound]);

  const checkNoMoreWords = useCallback(async (newSeq, currentPlayer) => {
    const possible = await getPossibleWords(newSeq);
    if (possible.length === 0) {
      const winner = currentPlayer === 'user' ? 'ai' : 'user';
      await registerRound(newSeq, winner);
      setCurrentPlayer(null);
      return true;
    }
    return false;
  }, [registerRound]);

  const updateSequence = useCallback((newSeq) => {
    setSequence(newSeq);
  }, []);

  const switchPlayer = useCallback(() => {
    setCurrentPlayer(prev => prev === 'user' ? 'ai' : 'user');
  }, []);

  const resetGame = useCallback(() => {
    setSequence('');
    setCurrentPlayer(null);
    setScore({ user: 0, ai: 0 });
    setRounds([]);
    setLastCompletedWord(null);
  }, []);

  const startNewRound = useCallback(() => {
    setSequence('');
    const startingPlayer = Math.random() < 0.5 ? 'user' : 'ai';
    setCurrentPlayer(startingPlayer);
  }, []);

  return {
    sequence,
    currentPlayer,
    score,
    rounds,
    lastCompletedWord,
    registerRound,
    checkWordCompletion,
    checkNoMoreWords,
    updateSequence,
    switchPlayer,
    resetGame,
    startNewRound,
  };
};

export default useGameState;