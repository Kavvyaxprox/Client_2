import Reveal from './Reveal';

const rates = [
  { title: 'Left Digit', value: '10 - 96', icon: '↔' },
  { title: 'Right Digit', value: '10 - 96', icon: '→' },
  { title: 'Jodi Digit', value: '10 - 960', icon: '✦' },
];

function RatesSection({ onRequireSignup }) {
  return (
    <section id="rates" className="section-container">
      <Reveal>
        <div className="section-header">
          <div>
            <span className="section-kicker">Win Big</span>
            <h2 className="section-title">
              Game Play <span className="gradient">Rates</span>
            </h2>
            <p className="section-subtitle">
              Simple, transparent payouts on every game type. Hover to explore.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="rates-grid">
        {rates.map((rate, index) => (
          <Reveal key={rate.title} delay={index * 120}>
            <button className="rate-card" type="button" onClick={onRequireSignup}>
              <span className="rate-icon">{rate.icon}</span>
              <span className="rate-title">{rate.title}</span>
              <span className="rate-value">{rate.value}</span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default RatesSection;
