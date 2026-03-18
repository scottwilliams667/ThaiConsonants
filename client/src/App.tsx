import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { getRandomItem } from './api'



function App() {
  const [item, setItem] = useState<{key: String, value: String} | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    getRandomItem().then(result => setItem(result));

  }, []);

  const handleRating = (rating: 'LOW' | 'MID' | 'HIGH') => {
    if(!item) return;

    const isCorrect = rating === item.value;

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
      getRandomItem().then(result => setItem(result));
    }, 1000);
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
          </div>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default App
