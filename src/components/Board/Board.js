import { useEffect, useState } from 'react';
import './Board.css';

function Board({ possibleWords, word, hasWon, setHasWon, setHasLost }) {
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [currGuessIndex, setCurrGuessIndex] = useState(0);
    const [guesses, setGuesses] = useState([[{val: '', active: 'active', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active:''}],
                                            [{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active:''}],
                                            [{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active:''}],
                                            [{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active:''}],
                                            [{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active:''}],
                                            [{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active: '', isCorrect: '', isProper: ''},{val: '', active:''}]
                                        ]);
    

                                     
    useEffect(() => {
        /* Helper function for handleEnterPress
        Return true if guess is 5 characters and in the possibleWords array */
        const validateGuess = () => {

            // Convert the current guess in guesses array to string
            const currGuess = guesses[currGuessIndex].map(char => char.val).join('');

            if (currCharIndex < 5) {
                alert('Word is too short');
                return false;
            } else if (!possibleWords.includes(currGuess)) {
                alert('Not a valid word');
                return false;
            }

            return true;         
        }

        /* Helper function for handleEnterPress
        Check if user has won & check if any letters are correct in guess*/
        const commitGuess = () => {

            // Convert the current guess in guesses array to string
            const currGuess = guesses[currGuessIndex].map(char => char.val).join('');

            // Check if user has won
            if(currGuess === word) {
                setHasWon(true);
                return true;
            }

            // Color the squares of characters that are correct
            let wordArr = word.split('');

            setGuesses((prevGuesses) => {
                let newGuesses = prevGuesses.map((prevGuess, i) => {
                    if(i === currGuessIndex) {
                        let newGuess = prevGuess.map((prevChar, j) => {
                            if(prevChar.val === wordArr[j]) {
                                return {...prevChar, isProper: 'proper'};
                            } else if (prevChar.val !== wordArr[j] && wordArr.includes(prevChar.val)) {
                                return {...prevChar, isCorrect: 'correct'};
                            } else {
                                return prevChar;
                            }
                        });

                        return newGuess;
                    } else {
                        return prevGuess;
                    }
                });

                return newGuesses;
            })
        }

        // Set up event listener for letter being pressed
        const handleLetterPress = (event) => {
            if(!'abcdefghijklmnopqrstuvwxyz'.includes(event.key)) {
                return;
            }

            // Update the current active character in 'guesses'
            setGuesses((prevGuesses) => {
                let newGuesses = prevGuesses.map((prevGuess, i) => {
                    if(i === currGuessIndex) {
                        let newGuess = prevGuess.map((prevChar, j) => {
                            if(j === currCharIndex) {
                                // Return the new value and remove active
                                return {val: event.key, active: '', isCorrect: '', isProper: ''};
                            } else if (j === currCharIndex + 1) {
                                return {val: '', active: 'active', isCorrect: '', isProper: ''}
                            } else {
                                return prevChar;
                            }
                        })

                        return newGuess;
                    } else {
                        return prevGuess;
                    }
                })

                return newGuesses;
            });

            // Increment the currCharIndex (if less than 6)
            setCurrCharIndex(prevCharIndex => {
                if(prevCharIndex < 5) { // Allow active to go beyond array
                    return prevCharIndex += 1;
                } else {
                    return prevCharIndex;
                }
            });
        }

        // Set up event listener for 'Backspace' being pressed
        const handleBackspacePress = (event) => {
            if(event.key !== "Backspace") {
                return;
            }

            // Update the current active character in 'guesses'
            setGuesses((prevGuesses) => {
                let newGuesses = prevGuesses.map((prevGuess, i) => {
                    if(i === currGuessIndex) {
                        let newGuess = prevGuess.map((prevChar, j) => {
                            if(j === currCharIndex - 1) {
                                return {val: '', active: 'active', isCorrect: '', isProper: ''};
                            } else if (j === currCharIndex && j > 0) {
                                return {val: '', active: '', isCorrect: '', isProper: ''};
                            } else {
                                return prevChar;
                            }
                        })

                        return newGuess;
                    } else {
                        return prevGuess;
                    }
                })

                return newGuesses;
            });

            setCurrCharIndex(prevCharIndex => {
                if(prevCharIndex > 0) {
                    return prevCharIndex -= 1;
                } else {
                    return prevCharIndex;
                }
            });
        }

        // Set up event listener for 'Enter' being pressed
        const handleEnterPress = (event) => {
            if(event.key !== 'Enter') {
                return;
            }

            // Validate the current guess
            if(!validateGuess()) {
                return;
            }

            // Commit the guess
            if(commitGuess() || hasWon) {
                return;
            }

            // Move the active CSS class to the next row
            setGuesses((prevGuesses) => {
                let newGuesses = prevGuesses.map((prevGuess, i) => {
                    if(i === currGuessIndex + 1) {
                        let newGuess = prevGuess.map((prevChar, j) => {
                            if(j === 0) {
                                return {val: '', active: 'active', isCorrect: '', isProper: ''};
                            } else {
                                return prevChar;
                            }
                        });

                        return newGuess;
                    } else {
                        return prevGuess;
                    }
                });

                return newGuesses;
            })
            
            // Update pointer to first index of next row
            setCurrCharIndex(0);
            setCurrGuessIndex(prevGuessIndex => {
                if(prevGuessIndex > 4) {
                    setHasLost(true);
                    return 6;
                } else {
                    return prevGuessIndex += 1;
                }
            })
        }

        window.addEventListener('keyup', handleLetterPress);
        window.addEventListener('keyup', handleBackspacePress);
        window.addEventListener('keyup', handleEnterPress);

        return () => {
            window.removeEventListener('keyup', handleLetterPress);
            window.removeEventListener('keyup', handleBackspacePress);
            window.removeEventListener('keyup', handleEnterPress);
        }

    },[guesses, currCharIndex, currGuessIndex, setHasLost, possibleWords, hasWon, setHasWon, word]);
                                          
    
    return (
        <div className="Board">
            <div className="row">
                <div className={`char ${guesses[0][0]['active']} ${guesses[0][0]['isCorrect']} ${guesses[0][0]['isProper']}`}>{guesses[0][0]['val']}</div>
                <div className={`char ${guesses[0][1]['active']} ${guesses[0][1]['isCorrect']} ${guesses[0][1]['isProper']}`}>{guesses[0][1]['val']}</div>
                <div className={`char ${guesses[0][2]['active']} ${guesses[0][2]['isCorrect']} ${guesses[0][2]['isProper']}`}>{guesses[0][2]['val']}</div>
                <div className={`char ${guesses[0][3]['active']} ${guesses[0][3]['isCorrect']} ${guesses[0][3]['isProper']}`}>{guesses[0][3]['val']}</div>
                <div className={`char ${guesses[0][4]['active']} ${guesses[0][4]['isCorrect']} ${guesses[0][4]['isProper']}`}>{guesses[0][4]['val']}</div>
            </div>
            <div className="row">
                <div className={`char ${guesses[1][0]['active']} ${guesses[1][0]['isCorrect']} ${guesses[1][0]['isProper']}`}>{guesses[1][0]['val']}</div>
                <div className={`char ${guesses[1][1]['active']} ${guesses[1][1]['isCorrect']} ${guesses[1][1]['isProper']}`}>{guesses[1][1]['val']}</div>
                <div className={`char ${guesses[1][2]['active']} ${guesses[1][2]['isCorrect']} ${guesses[1][2]['isProper']}`}>{guesses[1][2]['val']}</div>
                <div className={`char ${guesses[1][3]['active']} ${guesses[1][3]['isCorrect']} ${guesses[1][3]['isProper']}`}>{guesses[1][3]['val']}</div>
                <div className={`char ${guesses[1][4]['active']} ${guesses[1][4]['isCorrect']} ${guesses[1][4]['isProper']}`}>{guesses[1][4]['val']}</div>
            </div>
            <div className="row">
                <div className={`char ${guesses[2][0]['active']} ${guesses[2][0]['isCorrect']} ${guesses[2][0]['isProper']}`}>{guesses[2][0]['val']}</div>
                <div className={`char ${guesses[2][1]['active']} ${guesses[2][1]['isCorrect']} ${guesses[2][1]['isProper']}`}>{guesses[2][1]['val']}</div>
                <div className={`char ${guesses[2][2]['active']} ${guesses[2][2]['isCorrect']} ${guesses[2][2]['isProper']}`}>{guesses[2][2]['val']}</div>
                <div className={`char ${guesses[2][3]['active']} ${guesses[2][3]['isCorrect']} ${guesses[2][3]['isProper']}`}>{guesses[2][3]['val']}</div>
                <div className={`char ${guesses[2][4]['active']} ${guesses[2][4]['isCorrect']} ${guesses[2][4]['isProper']}`}>{guesses[2][4]['val']}</div>
            </div>
            <div className="row">
                <div className={`char ${guesses[3][0]['active']} ${guesses[3][0]['isCorrect']} ${guesses[3][0]['isProper']}`}>{guesses[3][0]['val']}</div>
                <div className={`char ${guesses[3][1]['active']} ${guesses[3][1]['isCorrect']} ${guesses[3][1]['isProper']}`}>{guesses[3][1]['val']}</div>
                <div className={`char ${guesses[3][2]['active']} ${guesses[3][2]['isCorrect']} ${guesses[3][2]['isProper']}`}>{guesses[3][2]['val']}</div>
                <div className={`char ${guesses[3][3]['active']} ${guesses[3][3]['isCorrect']} ${guesses[3][3]['isProper']}`}>{guesses[3][3]['val']}</div>
                <div className={`char ${guesses[3][4]['active']} ${guesses[3][4]['isCorrect']} ${guesses[3][4]['isProper']}`}>{guesses[3][4]['val']}</div>
            </div>
            <div className="row">
                <div className={`char ${guesses[4][0]['active']} ${guesses[4][0]['isCorrect']} ${guesses[4][0]['isProper']}`}>{guesses[4][0]['val']}</div>
                <div className={`char ${guesses[4][1]['active']} ${guesses[4][1]['isCorrect']} ${guesses[4][1]['isProper']}`}>{guesses[4][1]['val']}</div>
                <div className={`char ${guesses[4][2]['active']} ${guesses[4][2]['isCorrect']} ${guesses[4][2]['isProper']}`}>{guesses[4][2]['val']}</div>
                <div className={`char ${guesses[4][3]['active']} ${guesses[4][3]['isCorrect']} ${guesses[4][3]['isProper']}`}>{guesses[4][3]['val']}</div>
                <div className={`char ${guesses[4][4]['active']} ${guesses[4][4]['isCorrect']} ${guesses[4][4]['isProper']}`}>{guesses[4][4]['val']}</div>
            </div>
            <div className="row">
                <div className={`char ${guesses[5][0]['active']} ${guesses[5][0]['isCorrect']} ${guesses[5][0]['isProper']}`}>{guesses[5][0]['val']}</div>
                <div className={`char ${guesses[5][1]['active']} ${guesses[5][1]['isCorrect']} ${guesses[5][1]['isProper']}`}>{guesses[5][1]['val']}</div>
                <div className={`char ${guesses[5][2]['active']} ${guesses[5][2]['isCorrect']} ${guesses[5][2]['isProper']}`}>{guesses[5][2]['val']}</div>
                <div className={`char ${guesses[5][3]['active']} ${guesses[5][3]['isCorrect']} ${guesses[5][3]['isProper']}`}>{guesses[5][3]['val']}</div>
                <div className={`char ${guesses[5][4]['active']} ${guesses[5][4]['isCorrect']} ${guesses[5][4]['isProper']}`}>{guesses[5][4]['val']}</div>
            </div>
        </div>
    )
}

export default Board;