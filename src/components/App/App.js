import axios from 'axios';
import { useEffect, useState } from 'react';
import Board from '../Board/Board';
import './App.css';

function App() {
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [word, setWord] = useState('guess');
  const [possibleWords, setPossibleWords] = useState([]);

  // Get possible words and save in possibleWords state variable
  useEffect(() => {
    const getPossibleWords = async () => {
      const wordsTxtFile = await axios.get('https://gist.githubusercontent.com/cfreshman/cdcdf777450c5b5301e439061d29694c/raw/de1df631b45492e0974f7affe266ec36fed736eb/wordle-allowed-guesses.txt');
      const answersTxtFile = await axios.get('https://gist.githubusercontent.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b/raw/5d752e5f0702da315298a6bb5a771586d6ff445c/wordle-answers-alphabetical.txt');
      
      const allWords = wordsTxtFile.data.split('\n').concat(answersTxtFile.data.split('\n'));

      setPossibleWords(allWords);
    }
    
    getPossibleWords();
  }, []);

  // Choose random word from possibleWords
  useEffect(() => {
    let randomNum = Math.floor(Math.random() * 10658);

    setWord(possibleWords[randomNum]);
  }, [possibleWords])

  return (
    <div className="App">
      <Board 
        possibleWords={possibleWords} 
        word={word} 
        setHasWon={setHasWon} 
        setHasLost={setHasLost}
        hasWon={hasWon}
      />

      { hasWon ? 
          <div className="won"></div>
        :
          null
      }

      { hasLost ? 
          <div className="lost"></div>
        :
          null
      }
    </div>
  );
}

export default App;
