import Reveal from './Reveal';

const steps = [
  {
    title: 'Download App',
    desc: 'Grab the official SS BAZAR APK from our secure link.',
  },
  {
    title: 'Sign In To Your Account',
    desc: 'Use your registered user ID & password to log in.',
  },
  {
    title: 'Add Points',
    desc: 'Recharge via our verified, instant payment gateways.',
  },
  {
    title: 'Select Game & Start Playing',
    desc: 'Pick a market, place your bid, and watch live results.',
  },
];

function HowToPlaySection() {
  return (
    <section id="how-to-play" className="section-container">
      <Reveal>
        <div className="section-header">
          <div>
            <span className="section-kicker">Quick Start</span>
            <h2 className="section-title">
              How To <span className="gradient">Play</span>
            </h2>
            <p className="section-subtitle">
              Up and running in four simple steps. No complicated setup required.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="steps-grid">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 120}>
            <div className="step-card">
              <span className="step-number">{index + 1}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default HowToPlaySection;
