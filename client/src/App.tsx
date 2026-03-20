import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Consonants from './Consonants';
import Tones from './Tones';
import Vocab from './Vocab';

function App() {
  return (
    <BrowserRouter basename='/ThaiConsonants'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consonants" element={<Consonants />} />
        <Route path="/tones" element={<Tones />} />
        <Route path="/vocab" element={<Vocab />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;