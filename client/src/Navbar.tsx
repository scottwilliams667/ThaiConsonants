import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, height: '100%', zIndex: 1000 }}>
      <button 
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          fontSize: '2rem', 
          padding: '0.5rem 1rem', 
          cursor: 'pointer' 
        }} 
        onClick={() => setOpen(!open)}>☰
      </button>
      {open && (
        <ul style={{
          listStyle: 'none',
          padding: '4rem 1rem 1rem 1rem',
          margin: 0,
          backgroundColor: '#333',
          height: '100%',
          width: '200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }} onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/consonants" style={{ color: 'white', textDecoration: 'none' }} onClick={() => setOpen(false)}>Consonants</Link></li>
          <li><Link to="/tones" style={{ color: 'white', textDecoration: 'none' }} onClick={() => setOpen(false)}>Tones</Link></li>
          <li><Link to="/vocab" style={{ color: 'white', textDecoration: 'none' }} onClick={() => setOpen(false)}>Vocab</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;