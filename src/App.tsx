import React, { useState } from 'react';
import './App.css';

type Game = number[];

function getBallColor(number: number): string {
  if (number <= 10) return 'yellow';
  if (number <= 20) return 'blue';
  if (number <= 30) return 'red';
  if (number <= 40) return 'gray';
  return 'green';
}

function getRandomLottoNumbers(): Game {
  const numbers = new Set<number>();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function LottoBall({ number }: { number: number }) {
  return (
    <span className={`lotto-ball ball-${getBallColor(number)}`} aria-label={`${number}번`}>
      {number}
    </span>
  );
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [copied, setCopied] = useState(false);

  const generateGames = (count: number) => {
    setGames(Array.from({ length: count }, () => getRandomLottoNumbers()));
    setCopied(false);
  };

  const copyNumbers = async () => {
    if (!games.length) return;
    const text = games.map((game, index) => `${index + 1}게임: ${game.join(', ')}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="./" aria-label="럭키 식스 홈">
          <span className="brand-mark">6</span>
          <span>LUCKY <b>SIX</b></span>
        </a>
        <span className="top-tag"><span className="live-dot" /> LOTTO 6/45</span>
      </header>

      <section className="hero">
        <div className="eyebrow"><span>✦</span> 오늘의 행운을 뽑아보세요</div>
        <h1>행운의 번호,<br /><em>지금 시작!</em></h1>
        <p className="intro">가볍게 톡, 나만의 행운 번호 6개를 만나보세요.</p>

        <div className="lotto-card">
          <div className="card-heading">
            <div>
              <span className="card-kicker">YOUR LUCKY NUMBERS</span>
              <h2>행운 번호 추첨</h2>
            </div>
            <span className="round-stamp">6<span>/</span>45</span>
          </div>

          {games.length > 0 ? (
            <div className="results" aria-live="polite">
              {games.map((game, index) => (
                <div className="game-row" key={`${games.length}-${index}`}>
                  {games.length > 1 && <div className="game-label">{String(index + 1).padStart(2, '0')}</div>}
                  <div className="balls">
                    {game.map(number => <LottoBall key={number} number={number} />)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="ghost-balls">
                {[7, 14, 23, 32, 41, 5].map((number, index) => (
                  <span className="ghost-ball" key={index}>?</span>
                ))}
              </div>
              <p>버튼을 누르면 행운 번호가 나타나요</p>
            </div>
          )}

          <div className="card-actions">
            <button className="primary-button" onClick={() => generateGames(1)}>
              <span className="sparkle">✦</span> 번호 생성하기
            </button>
            <button className="secondary-button" onClick={() => generateGames(5)}>
              5게임 생성
            </button>
            {games.length > 0 && (
              <button className="copy-button" onClick={copyNumbers}>
                {copied ? '✓ 복사 완료' : '번호 복사'}
              </button>
            )}
          </div>
          <p className="card-note">번호는 1부터 45까지 중복 없이 무작위로 추첨됩니다.</p>
        </div>

        <div className="color-guide">
          <span className="guide-title">공 색상 안내</span>
          <div className="guide-items">
            <span><i className="guide-ball yellow" />1–10</span>
            <span><i className="guide-ball blue" />11–20</span>
            <span><i className="guide-ball red" />21–30</span>
            <span><i className="guide-ball gray" />31–40</span>
            <span><i className="guide-ball green" />41–45</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span className="footer-star">✳</span>
        <span>GOOD LUCK, HAVE A NICE DAY</span>
        <span className="footer-star">✳</span>
      </footer>
    </main>
  );
}

export default App;
