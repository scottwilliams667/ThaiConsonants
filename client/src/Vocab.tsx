import { useEffect, useState } from 'react';
import { getNextItem, addVocabItem } from './api';

function Vocab() {
  const [item, setItem] = useState<{ key: string; value: string } | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [newThai, setNewThai] = useState('');
  const [newEnglish, setNewEnglish] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getNextItem('vocab').then(result => setItem(result));
  }, []);

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      getNextItem('vocab').then(result => setItem(result));
    }, 300); // wait for flip animation to reset before loading next
  };

  const handleAddWord = async () => {
    if (!newThai.trim() || !newEnglish.trim()) return;
    await addVocabItem(newThai.trim(), newEnglish.trim());
    setNewThai('');
    setNewEnglish('');
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div>
      {item ? (
        <>
          <div className="flip-card">
            <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
              <div className="flip-card-front">
                {item.key}
              </div>
              <div className="flip-card-back">
                {item.value}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => setFlipped(true)}>Show</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </>
      ) : (
        <p>No vocab items yet — add one below!</p>
      )}

      <div style={{ marginTop: '4rem' }}>
        <h2>Add a new word</h2>
        <input
          type="text"
          value={newThai}
          onChange={e => setNewThai(e.target.value)}
          placeholder="Thai word..."
        />
        <input
          type="text"
          value={newEnglish}
          onChange={e => setNewEnglish(e.target.value)}
          placeholder="English meaning..."
        />
        <button onClick={handleAddWord}>Add</button>
        {added && <p>✅ Added!</p>}
      </div>
    </div>
  );
}

export default Vocab;