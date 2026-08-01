import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

function CountUp({ target, duration = 1800 }) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return undefined;

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target, duration]);

  return <span ref={ref}>{value.toLocaleString()}+</span>;
}

function HeroSection({ onDownload, onOpenChart, isDownloading, downloadProgress, downloadLabel }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-orb one" />
      <div className="hero-orb two" />

      <div className="hero-content">
        <Reveal>
          <span className="hero-badge">
            <span className="live-dot" />
            100% Secure Gaming Platform
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="hero-title">
            India&apos;s Most Trusted <span className="gradient">SS BAZAR</span> App
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="hero-subtitle">
            Play &amp; compete daily with real-time updates. Instant results, secure
            payments, and seamless withdrawals — all in one place.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="cta-group">
            <button className="btn btn-download" onClick={onDownload} type="button">
              <span className="btn-text">{downloadLabel}</span>
              {isDownloading && <span className="btn-spinner" />}
              <div
                className="download-progress"
                style={{ width: `${downloadProgress}%` }}
              />
            </button>
            <button className="btn btn-outline" onClick={onOpenChart} type="button">
              Play Online
            </button>
            <a
              href="https://wa.me/7880223499"
              className="btn btn-whatsapp"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={450}>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">
                <CountUp target={48} />
              </div>
              <div className="hero-stat-label">Daily Markets</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">
                <CountUp target={12500} />
              </div>
              <div className="hero-stat-label">Active Players</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">
                <CountUp target={99} />
              </div>
              <div className="hero-stat-label">Uptime &amp; Security</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default HeroSection;
