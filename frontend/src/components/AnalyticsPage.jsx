import { useEffect, useState } from 'react';

const marketColumns = [
  'DELHI BAZAR',
  'SHREE GANESH',
  'FARIDABAD',
  'GHAZIABAD',
  'GALI',
  'DESAWAR',
];

function useRecentDates(count = 7) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const days = [];
    const today = new Date();
    for (let i = count - 1; i >= 0; i -= 1) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days.push(
        d.toLocaleDateString([], {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      );
    }
    setRows(days);
  }, [count]);

  return rows;
}

function AnalyticsPage({ onBackHome }) {
  const dates = useRecentDates(7);

  return (
    <div className="analytics-page">
      <header className="analytics-topbar">
        <div className="nav-container">
          <button className="brand-logo analytics-brand" type="button" onClick={onBackHome}>
            <span className="brand-mark">SB</span>
            <span className="logo-text">SS BAZAR</span>
          </button>
          <button className="btn btn-outline" type="button" onClick={onBackHome}>
            Back to Home
          </button>
        </div>
      </header>

      <main className="section-container">
        <div className="section-header">
          <div>
            <span className="section-kicker">Real-Time Board</span>
            <h2 className="section-title">
              Live <span className="gradient">Analytics</span>
            </h2>
            <p className="section-subtitle">
              Daily results across all markets. Data streams in real time as it is published.
            </p>
          </div>
        </div>

        <div className="table-card">
          <div className="table-scroll">
            <table className="data-table analytics-table">
              <thead>
                <tr>
                  <th>Date</th>
                  {marketColumns.map((market) => (
                    <th key={market}>{market}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dates.map((date) => (
                  <tr key={date}>
                    <td className="analytics-date">{date}</td>
                    {marketColumns.map((market) => (
                      <td key={market} className="analytics-cell">
                        --
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AnalyticsPage;
