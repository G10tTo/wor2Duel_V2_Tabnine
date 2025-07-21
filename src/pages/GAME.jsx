import Gs from '../styles/GAME.module.css';
import WordDisplay from '../game_components/WordDisplay.component';
import Header from '../page_components/Header.component';
import LetterButtons from '../game_components/LetterButtons.component';
import { getPossibleWords } from '../game_components/dictionary';
import GameRules from '../game_components/Rules.component';
import { useState, useEffect, useRef } from 'react';
import RoundTable from '../game_components/RoundTable.component';
import useGameState from '../hooks/useGameState';

function App() {
  const {
    sequence,
    currentPlayer,
    score,
    rounds,
    lastCompletedWord,
    checkWordCompletion,
    checkNoMoreWords,
    updateSequence,
    switchPlayer,
    resetGame,
    startNewRound,
  } = useGameState();

  const [showRules, setShowRules] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const turnTimer = useRef(null);

  useEffect(() => {
    if (currentPlayer === 'ai') {
      startTurn();
    }
  }, [currentPlayer]);

  const startTurn = () => {
    clearTimeout(turnTimer.current);
    turnTimer.current = setTimeout(() => {
      if (currentPlayer === 'ai') {
        aiTurn();
      }
    }, 2000);
  };

  const handleUserInput = async (letter) => {
    if (currentPlayer !== 'user') return;
    const newSeq = sequence + letter.toLowerCase();

    if (await checkWordCompletion(newSeq, 'user')) return;
    if (await checkNoMoreWords(newSeq, 'user')) return;

    updateSequence(newSeq);
    switchPlayer();
  };

  const aiTurn = async () => {
    const possible = await getPossibleWords(sequence);

    if (possible.length === 0) {
      await checkNoMoreWords(sequence, 'ai');
      return;
    }

    const nextLetters = possible.map(w => w[sequence.length]).filter(Boolean);

    if (nextLetters.length === 0) {
      await checkNoMoreWords(sequence, 'ai');
      return;
    }

    const nextLetter = nextLetters[Math.floor(Math.random() * nextLetters.length)];
    const newSeq = sequence + nextLetter.toLowerCase();

    if (await checkWordCompletion(newSeq, 'ai')) return;

    updateSequence(newSeq);
    switchPlayer();
  };

  return (
    <div className={Gs.App}>
      <Header onRestart={resetGame} />
      <div className={Gs.scores}>
        <div className={Gs.score}>
          <p>Player:</p>
          <p>{score.user}</p>
        </div>
        <div className={Gs.score}>
          <p>AI:</p>
          <p>{score.ai}</p>
        </div>
      </div>

      <div
        className={Gs.circleContainer}
        style={{
          boxShadow: currentPlayer === 'ai' ? '0 0 15px rgb(255, 0, 0)' : '0 0 15px rgb(0, 255, 0)',
        }}
      >
        <LetterButtons onClick={handleUserInput} disabled={currentPlayer !== 'user'} />

        <div className={Gs.circleCenter}>
          {currentPlayer === null ? (
            <p>LET'S PLAY</p>
          ) : (
            <p>{currentPlayer === 'user' ? 'Player' : 'AI'}'s turn</p>
          )}

          <WordDisplay
            sequence={sequence}
            lastCompletedWord={lastCompletedWord}
            currentPlayer={currentPlayer}
          />

          <div className={Gs.controls}>
            <button onClick={() => setShowRules(true)}>Rules</button>
            <button onClick={startNewRound}>Start</button>
          </div>
          <div className={Gs.results}>
            <button onClick={() => setShowResults(true)}>View Results</button>
          </div>
        </div>
      </div>
      
      {showRules && <GameRules onClose={() => setShowRules(false)} />}
      {showResults && <RoundTable rounds={rounds} onClose={() => setShowResults(false)} />}
    </div>
  );
}

export default App;