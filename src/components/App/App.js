import axios from 'axios';
import { useEffect, useState } from 'react';
import Board from '../Board/Board';
import Keyboard from '../Keyboard/Keyboard';
import './App.css';

function App() {
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
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
          <div className="won">You've won! Refresh to play another!</div>
        :
          null
      }

      { hasLost ? 
          <div className="lost">You've lost! Refresh to play another!</div>
        :
          null
      }
    </div>
  );
}

export default App;
