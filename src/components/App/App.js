import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Board from '../Board/Board';
import Keyboard from '../Keyboard/Keyboard';
import ReactCanvasConfetti from 'react-canvas-confetti';
import './App.css';

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

function App() {
  const [winCount, setWinCount] = useState(() => {
    const wins = localStorage.getItem('wins');
    return wins ? parseInt(wins) : 0;
  });
  const [lossCount, setLossCount] = useState(() => {
    const losses = localStorage.getItem('losses');
    return losses ? parseInt(losses) : 0;
  });
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [word, setWord] = useState('guess');
  const [possibleAnswers, setPossibleAnswers] = useState([]);
  const [possibleWords, setPossibleWords] = useState([]);
  const [seenLetters, setSeenLetters] = useState({
    q: { correct: '', proper: '', incorrect: '' },
    w: { correct: '', proper: '', incorrect: '' },
    e: { correct: '', proper: '', incorrect: '' },
    r: { correct: '', proper: '', incorrect: '' },
    t: { correct: '', proper: '', incorrect: '' },
    y: { correct: '', proper: '', incorrect: '' },
    u: { correct: '', proper: '', incorrect: '' },
    i: { correct: '', proper: '', incorrect: '' },
    o: { correct: '', proper: '', incorrect: '' },
    p: { correct: '', proper: '', incorrect: '' },
    a: { correct: '', proper: '', incorrect: '' },
    s: { correct: '', proper: '', incorrect: '' },
    d: { correct: '', proper: '', incorrect: '' },
    f: { correct: '', proper: '', incorrect: '' },
    g: { correct: '', proper: '', incorrect: '' },
    h: { correct: '', proper: '', incorrect: '' },
    j: { correct: '', proper: '', incorrect: '' },
    k: { correct: '', proper: '', incorrect: '' },
    l: { correct: '', proper: '', incorrect: '' },
    z: { correct: '', proper: '', incorrect: '' },
    x: { correct: '', proper: '', incorrect: '' },
    c: { correct: '', proper: '', incorrect: '' },
    v: { correct: '', proper: '', incorrect: '' },
    b: { correct: '', proper: '', incorrect: '' },
    n: { correct: '', proper: '', incorrect: '' },
    m: { correct: '', proper: '', incorrect: '' }
  })
  const [restart, setRestart] = useState(true);

  // Report wins to localStorage
  useEffect(() => {
    localStorage.setItem('wins', winCount);
  }, [winCount]);

  // Report losses to localStorage
  useEffect(() => {
    localStorage.setItem('losses', lossCount);
  }, [lossCount]);

  // Get possible words and save in possibleWords state variable
  useEffect(() => {
    const getPossibleWords = async () => {
      const wordsTxtFile = await axios.get('https://gist.githubusercontent.com/cfreshman/cdcdf777450c5b5301e439061d29694c/raw/de1df631b45492e0974f7affe266ec36fed736eb/wordle-allowed-guesses.txt');
      const answersTxtFile = await axios.get('https://gist.githubusercontent.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b/raw/5d752e5f0702da315298a6bb5a771586d6ff445c/wordle-answers-alphabetical.txt');
      
      const allAnswers = answersTxtFile.data.split('\n');
      const allWords = wordsTxtFile.data.split('\n').concat(answersTxtFile.data.split('\n'));

      setPossibleAnswers(allAnswers);
      setPossibleWords(allWords);
    }
    
    getPossibleWords();
  }, []);

  // Choose random word from possibleAnswers
  useEffect(() => {
    let randomNum = Math.floor(Math.random() * possibleAnswers.length);

    setWord(possibleAnswers[randomNum]);
  }, [possibleAnswers, restart]);

  return (
    <div className="App">
      <div className="counter">Wins: {winCount} | Losses: {lossCount}</div>
      <Board 
        possibleWords={possibleWords} 
        word={word} 
        setHasWon={setHasWon} 
        setHasLost={setHasLost}
        hasWon={hasWon}
        hasLost={hasLost}
        setSeenLetters={setSeenLetters}
        setWinCount={setWinCount}
        setLossCount={setLossCount}
        setRestart={setRestart}
      />

      <Keyboard 
        seenLetters={seenLetters}
      />

      { hasWon ?
          <>
            <div className="won">
              <p>You won!</p>
              <p className="tag">Press Enter to play another!</p>
              
            </div>
            <ReactCanvasConfetti style={canvasStyles} />
          </>
        :
          null
      }

      { hasLost ? 
          <div className="lost">
            <p>You lost!</p>
            <p className="tag">The word was {word.toUpperCase()}</p>
            <p className="tag">Press Enter to play another!</p>
          </div>
        :
          null
      }
    </div>
  );
}

export default App;
