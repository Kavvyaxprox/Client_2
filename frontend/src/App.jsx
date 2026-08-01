import { useEffect, useState } from 'react';
import './App.css';
import ChartModal from './components/ChartModal';
import FaqSection from './components/FaqSection';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HowToPlaySection from './components/HowToPlaySection';
import RatesSection from './components/RatesSection';
import TimeTableSection from './components/TimeTableSection';
import Ticker from './components/Ticker';

const marketData = [
  { name: 'DELHI BAZAR', time: '06:00 AM', result: '78', status: 'live' },
  { name: 'SHREE GANESH', time: '04:30 PM', result: '42', status: 'live' },
  { name: 'FARIDABAD', time: '06:00 PM', result: '91', status: 'live' },
  { name: 'GHAZIABAD', time: '08:30 PM', result: '15', status: 'live' },
  { name: 'GALI', time: '11:30 PM', result: '**', status: 'pending' },
  { name: 'DESAWAR', time: '05:00 AM', result: '**', status: 'pending' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadLabel, setDownloadLabel] = useState('Download App');
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [chartText, setChartText] = useState('Connecting to Secure Real-Time Data Feed...');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (!isChartOpen) return;

    const timer = window.setTimeout(() => {
      const randomVal = Math.floor(Math.random() * 90) + 10;
      setChartText(`Live Market Trend Value: ${randomVal}`);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [isChartOpen]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);
  const handleNavLinkClick = () => setMenuOpen(false);

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadLabel('Preparing Download...');
    setDownloadProgress(0);

    const interval = window.setInterval(() => {
      setDownloadProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          window.clearInterval(interval);
          setDownloadLabel('Download Started!');
          triggerSecureDownload();
          window.setTimeout(() => {
            setDownloadProgress(0);
            setDownloadLabel('Download App');
            setIsDownloading(false);
          }, 3000);
          return 100;
        }
        return next;
      });
    }, 150);
  };

  const triggerSecureDownload = () => {
    const anchor = document.createElement('a');
    anchor.href = '/downloads/ss-bazar.apk';
    anchor.setAttribute('download', 'SS-Bazar.apk');
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleOpenChart = () => {
    setIsChartOpen(true);
    setChartText('Connecting to Secure Real-Time Data Feed...');
  };

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onMenuToggle={handleMenuToggle}
        onNavLinkClick={handleNavLinkClick}
        onPlay={handleOpenChart}
      />
      <main>
        <HeroSection
          onDownload={handleDownload}
          onOpenChart={handleOpenChart}
          isDownloading={isDownloading}
          downloadProgress={downloadProgress}
          downloadLabel={downloadLabel}
        />
        <Ticker marketData={marketData} />
        <TimeTableSection marketData={marketData} onOpenChart={handleOpenChart} />
        <RatesSection />
        <HowToPlaySection />
        <FaqSection />
      </main>
      <footer className="footer">
        <div className="footer-brand">SS BAZAR</div>
        <p>
          © 2026 SS BAZAR | All Rights Reserved |{' '}
          <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
        </p>
      </footer>
      <button
        type="button"
        className={`back-to-top${showBackToTop ? ' visible' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
      <ChartModal isOpen={isChartOpen} onClose={() => setIsChartOpen(false)} chartText={chartText} />
    </>
  );
}

export default App;
