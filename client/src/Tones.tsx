import { useEffect, useState } from 'react'
import './App.css'
import { addNewWord, getNextItem } from './api'



function Tones() {
  const [item, setItem] = useState<{ key: string; value: string } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [newWord, setNewWord] = useState('');
  const [added, setAdded] = useState(false);

  const hardEndings = 'ดกบปะ'
  const midClassLetters = 'อกดตบปจ';
  const lowClassLetters = 'ยวมนลงรคชซทฟพธณญภฮ';
  const highClassLetters = 'ผฉขศษสถหฝ';
  const toneMarks = ' ่ ้  ๊  ๋';

  useEffect(() => {
    getNextItem('tones').then(result => setItem(result));

  }, []);

  const handleRating = (rating: 'LOW' | 'MID' | 'HIGH' | 'RISE' | 'FALL') => {
    if(!item) return;

    const word = item.key;

    let isCorrect = false;
    //starting letter is mid class
    if(midClassLetters.includes(word[0]))
    {
        const endingLetter = word.at(word.length - 1);  
        if(endingLetter && hardEndings.includes(endingLetter[0]))
        {
            isCorrect = rating == 'LOW';
        }
        else if(word.includes(`'`))
        {
            isCorrect = rating == 'LOW';
        }
        else if(word.includes(` ้`))
        {
            isCorrect = rating == 'FALL';
        }
        else
        {
            isCorrect = rating == 'MID';
        }
    }
    else if(lowClassLetters.includes(word[0]))
    {

    }
    else if(highClassLetters.includes(word[0]))
    {

    }

    //starting letter is high class

    //starting letter is low class


    if (isCorrect) {
      setMessage('✅ Correct!');
      setStreak(prev => prev + 1);
    } else {
      setMessage(`❌ Wrong! The correct answer was ${item.value}`);
      setStreak(0);
    }

    // Wait a moment so the user can see the message, then load next item
    setTimeout(() => {
      setMessage(null);
      getNextItem('tones').then(result => setItem(result));
    }, 1000);
  };

  const handleAddWord = async () => {
    if (!newWord.trim()) return;
    await addNewWord(newWord.trim(), 'MID'); // default value, can change later
    setNewWord('');
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
   <div>
      <p>🔥 Streak: {streak}</p>

      {item && (
        <>
          <h1 className="key-display">{item.key}</h1>
          <div>
            <button className="button-display" onClick={() => handleRating('LOW')}>LOW</button>
            <button className="button-display" onClick={() => handleRating('MID')}>MID</button>
            <button className="button-display" onClick={() => handleRating('HIGH')}>HIGH</button>
            <button className="button-display" onClick={() => handleRating('RISE')}>RISE</button>
            <button className="button-display" onClick={() => handleRating('FALL')}>FALL</button>
          </div>
        </>
      )}

      {message && <p>{message}</p>}

      <div style={{ marginTop: '2rem' }}>
        <input
          type="text"
          value={newWord}
          onChange={e => setNewWord(e.target.value)}
          placeholder="Add a new word..."
        />
        <button onClick={handleAddWord}>Add</button>
        {added && <p>✅ Added!</p>}
      </div>
    </div>
  );
}

export default Tones
