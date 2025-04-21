import React, { useState } from 'react';
import './App.css';

function getRandomLottoNumbers(): number[] {
  const numbers = new Set<number>();
  while (numbers.size < 6) {
    const random = Math.floor(Math.random() * 45) + 1;
    numbers.add(random);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function App() {
  const [lottoNumbers, setLottoNumbers] = useState<number[]>([]);

  const generateNumbers = () => {
    setLottoNumbers(getRandomLottoNumbers());
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>🎲 로또 번호 생성기</h1>
      <button
        onClick={generateNumbers}
        style={{
          padding: '10px 20px',
          fontSize: '18px',
          borderRadius: '10px',
          cursor: 'pointer',
          marginBottom: '30px'
        }}
      >
        번호 생성하기
      </button>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
  {lottoNumbers.length > 0 &&
    lottoNumbers.map((num, idx) => (
      <span key={idx} className="ball">
        {num}
      </span>
    ))}
</div>
    </div>
  );
}

export default App;
