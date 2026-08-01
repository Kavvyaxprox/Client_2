import { useEffect, useState } from 'react';
import Reveal from './Reveal';

const markets = {
  'DELHI BAZAR': 'D',
  'SHREE GANESH': 'G',
  FARIDABAD: 'F',
  GHAZIABAD: 'Gh',
  GALI: 'Ga',
  DESAWAR: 'De',
};

function useClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function TimeTableSection({ marketData, onRequireSignup }) {
  const clock = useClock();

  const handleRefresh = () => onRequireSignup();

  return (
    <section id="timetable" className="section-container">
      <Reveal>
        <div className="section-header">
          <div>
            <span className="section-kicker">Live Board</span>
            <h2 className="section-title">
              Game Time Table <span className="gradient">&amp; Results</span>
            </h2>
            <p className="section-subtitle">
              Real-time results streamed securely to your screen. Refresh any time to see the latest draws.
            </p>
          </div>
          <div className="table-actions">
            <div className="live-clock">
              <span className="live-dot" />
              {clock}
            </div>
            <button className="btn btn-ghost" type="button" onClick={handleRefresh}>
              Refresh Results
            </button>
            <button className="btn btn-outline" type="button" onClick={onRequireSignup}>
              View Analytics
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div className="table-card">
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Market Name</th>
                  <th>Open Time</th>
                  <th>Status</th>
                  <th>Live Result</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <span className="market-name">
                        <span className="market-icon">{markets[row.name] ?? 'S'}</span>
                        {row.name}
                      </span>
                    </td>
                    <td>
                      <span className="market-time">
                        <svg className="time-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        {row.time}
                      </span>
                    </td>
                    <td>
                      {row.status === 'live' ? (
                        <span className="status-chip">
                          <span className="live-dot" /> Live
                        </span>
                      ) : (
                        <span className="status-chip" style={{ color: 'var(--warning)' }}>
                          Pending
                        </span>
                      )}
                    </td>
                    <td>
                      <span className={`result-pill ${row.status === 'live' ? 'result-live' : 'result-pending'}`}>
                        {row.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default TimeTableSection;
