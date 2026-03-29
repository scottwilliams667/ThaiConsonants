import { useEffect, useState } from 'react'
import './App.css'
import { addNewWord, getNextItem, getNextToneItem } from './api'

type ClassFilter = 'ALL' | 'LOW' | 'MID' | 'HIGH' | 'MID,HIGH';

function Tones() {
   const [item, setItem] = useState<{ key: string; value: string } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [filter, setFilter] = useState<ClassFilter>('ALL');
  const [newWord, setNewWord] = useState('');
  const [added, setAdded] = useState(false);

  const hardEndings = 'ดกบปะ'
  const midClassLetters = 'อกดตบปจ';
  const lowClassLetters = 'ยวมนลงรคชซทฟพธณญภฮ  ฒฬฌฆฑ';
  const highClassLetters = 'ผฉขศษสถหฝ';
  const shortVowels = 'ะ   ิ  ึ  ั  ุ  ';
  const longVowels = 'อ า  ี  ื ู  ';
  const allConsonants = 'อกดตบปจยวมนลงรคชซทฟพธณญภฮผฉขศษสถหฝ';
  //const toneMarks = ' ่ ้  ๊  ๋';

   useEffect(() => {
    getNextToneItem('ALL').then(result => setItem(result));
  }, []);

  const fetchNext = (currentFilter: ClassFilter) => {
    getNextToneItem(currentFilter).then(result => setItem(result));
  };

  const handleFilterChange = (newFilter: ClassFilter) => {
    setFilter(newFilter);
    setMessage(null);
    setStreak(0);
    fetchNext(newFilter);
  };
  const handleRating = (rating: 'LOW' | 'MID' | 'HIGH' | 'RISE' | 'FALL') => {
    if(!item) return;

    //const word = item.key;

    //let isCorrect = false;

     const isCorrect = rating === item.value;
    //starting letter is mid class
    // if(midClassLetters.includes(word[0]))
    // {
    //     const endingLetter = word.at(word.length - 1);  
    //     if(endingLetter && hardEndings.includes(endingLetter[0]))
    //     {
    //         isCorrect = rating == 'LOW';
    //     }
    //     else if(word.includes(`'`))
    //     {
    //         isCorrect = rating == 'LOW';
    //     }
    //     else if(word.includes(` ้`))
    //     {
    //         isCorrect = rating == 'FALL';
    //     }
    //     else if(word.includes(` ๊`))
    //     {
    //       isCorrect = rating == 'HIGH';
    //     }
    //     else if(word.includes(` ๋`))
    //     {
    //       isCorrect = rating == 'RISE';
    //     }
    //     else
    //     {
    //         isCorrect = rating == 'MID';
    //     }
    // }
    // else if(lowClassLetters.includes(word[0]))
    // {
    //   const endingLetter = word.at(word.length - 1);
    //   if(endingLetter && hardEndings.includes(endingLetter[0]))
    //   {
    //     isCorrect = rating == 'LOW';
    //   }
    //   else if(word.includes(`'`))
    //   {
    //       isCorrect = rating == 'LOW';
    //   }
    //   else if(word.includes(` ้`))
    //   {
    //       isCorrect = rating == 'FALL';
    //   }
    //   else
    //   {
    //     isCorrect = rating == 'RISE';
    //   }

    // }
    // else if(highClassLetters.includes(word[0]))
    // {
    //   const endingLetter = word.at(word.length - 1);
    //   const endingVowel = word.at(word.length - 2);
    //   if(endingLetter && endingVowel && hardEndings.includes(endingLetter) && shortVowels.includes(endingVowel))
    //   {
    //       isCorrect = rating == 'FALL';
    //   }
    //   else if(endingLetter && endingVowel && hardEndings.includes(endingLetter) && longVowels.includes(endingVowel))
    //   {
    //     isCorrect = rating == 'HIGH';
    //   }
    //   else if(word.includes(`'`))
    //   {
    //       isCorrect = rating == 'FALL';
    //   }
    //   else if(word.includes(` ้`))
    //   {
    //       isCorrect = rating == 'HIGH';
    //   }
    //   else
    //   {
    //     isCorrect = rating == 'MID';

    //   }
    // }

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
      fetchNext(filter);
    }, 1000);
  };

  const handleAddWord = async () => {
    if (!newWord.trim()) return;
    await addNewWord(newWord.trim(), 'MID'); // default value, can change later
    setNewWord('');
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const filterButtons: ClassFilter[] = ['LOW', 'MID', 'HIGH', 'MID,HIGH', 'ALL'];
return (
    <div>
      <p>🔥 Streak: {streak}</p>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem', marginTop: '2rem' }}>
        Filter: {filterButtons.map(f => (
          <button
            key={f}
            onClick={() => handleFilterChange(f)}
            style={{ fontWeight: filter === f ? 'bold' : 'normal', textDecoration: filter === f ? 'underline' : 'none' }}
          >
            {f === 'MID,HIGH' ? 'MID & HIGH' : f}
          </button>
        ))}
      </div>

      {message && <p>{message}</p>}

      {item && (
        <>
          <h1 style={{ fontSize: '6rem', marginBottom: '4rem', marginTop: '4rem' }}>{item.key}</h1>
          <div>
            <button onClick={() => handleRating('LOW')}>LOW</button>
            <button onClick={() => handleRating('MID')}>MID</button>
            <button onClick={() => handleRating('HIGH')}>HIGH</button>
            <button onClick={() => handleRating('RISE')}>RISE</button>
            <button onClick={() => handleRating('FALL')}>FALL</button>
          </div>
        </>
      )}

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
