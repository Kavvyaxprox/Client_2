import { useEffect, useState } from 'react';

function getBars() {
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 80) + 20);
}

function ChartModal({ isOpen, onClose, chartText }) {
  const [bars, setBars] = useState(getBars);

  useEffect(() => {
    if (!isOpen) return undefined;

    const timer = window.setInterval(() => {
      setBars((prev) => [...prev.slice(1), Math.floor(Math.random() * 80) + 20]);
    }, 900);

    return () => window.clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;

  const loading = chartText.startsWith('Connecting');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Real-Time Analytics</h3>
          <button className="modal-close" onClick={onClose} type="button" aria-label="Close">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>Live trend feed updating dynamically in real time.</p>
          <div className="chart-card">
            {loading ? (
              <div className="chart-loading">
                <span className="btn-spinner" />
                <span>Connecting to secure feed...</span>
              </div>
            ) : (
              <>
                <div className="chart-value">{chartText}</div>
                <div className="chart-bars" aria-hidden="true">
                  {bars.map((height, index) => (
                    <span
                      key={`${index}-${height}`}
                      className="chart-bar"
                      style={{ height: `${height}%`, animationDelay: `${index * 45}ms` }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartModal;
