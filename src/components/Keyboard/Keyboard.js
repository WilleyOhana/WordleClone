import { useEffect, useState } from 'react';
import './Keyboard.css';

const Keyboard = ({ seenLetters }) => {

    const [letterKeys, setLetterKeys] = useState([]);

    // Set up keys to be mapped into DOM elements
    useEffect(() => {
        let arr = [];

        for(const key in seenLetters) {
            arr.push({key: key, correct: seenLetters[key]['correct'], proper: seenLetters[key]['proper'], incorrect: seenLetters[key]['incorrect']});
        }

        setLetterKeys(arr);
    }, [seenLetters]);

    const handleLetterClick = (letter) => {
        window.dispatchEvent(new KeyboardEvent('keyup', {'key': letter}));
    }

    return (
        <div className="Keyboard">
            <div className='row'>
                {
                    letterKeys.map((letter, i) => {
                        if(i >= 10) return null;
                        return (
                            <div 
                                className={`key ${letter['correct']} ${letter['proper']} ${letter['incorrect']}`}
                                key={i}
                                onClick={() => handleLetterClick(letter.key)}
                            >
                                { letter.key }
                            </div>
                        )
                    })
                }
            </div>
            <div className='row'>
                {
                    letterKeys.map((letter, i) => {
                        if(i < 10 || i > 18) return null;
                        return (
                            <div 
                                className={`key ${letter['correct']} ${letter['proper']} ${letter['incorrect']}`}
                                key={i}
                                onClick={() => handleLetterClick(letter.key)}
                            >
                                { letter.key }
                            </div>
                        )
                    })
                }
            </div>
            <div className='row'>
                <div className="key" onClick={() => handleLetterClick('Enter')}>Enter</div>
                {
                    letterKeys.map((letter, i) => {
                        if(i <= 18 || i >= 26) return null;
                        return (
                            <div 
                                className={`key ${letter['correct']} ${letter['proper']} ${letter['incorrect']}`}
                                key={i}
                                onClick={() => handleLetterClick(letter.key)}
                            >
                                { letter.key }
                            </div>
                        )
                    })
                }
                <div className="key" onClick={() => handleLetterClick('Backspace')}>Backspace</div>
            </div>
        </div>
    )
}

export default Keyboard;