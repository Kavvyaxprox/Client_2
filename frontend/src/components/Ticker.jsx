function Ticker({ marketData }) {
  const items = [...marketData, ...marketData];

  return (
    <div className="ticker" aria-label="Live market results">
      <div className="ticker-track">
        {items.map((market, index) => (
          <span className="ticker-item" key={`${market.name}-${index}`}>
            <span className="live-dot" />
            <strong>{market.name}</strong>
            <span className="ticker-result">{market.result}</span>
            <span>{market.time}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Ticker;
