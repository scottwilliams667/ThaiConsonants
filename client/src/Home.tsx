import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Thai Learning</h1>
      <button onClick={() => navigate('/consonants')}>Consonants</button>
      <button onClick={() => navigate('/tones')}>Tones</button>
    </div>
  );
}

export default Home;