import { useEffect, useState } from 'react';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#timetable', label: 'Time Table' },
  { href: '#rates', label: 'Game Rates' },
  { href: '#how-to-play', label: 'How To Play' },
  { href: '#faq', label: 'FAQ' },
];

function Header({ menuOpen, onMenuToggle, onNavLinkClick, onRequireSignup }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="brand-logo" onClick={onNavLinkClick}>
          <span className="brand-mark">SB</span>
          <span className="logo-text">SS BAZAR</span>
        </a>

        <button
          className={`hamburger-menu${menuOpen ? ' open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={onMenuToggle}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links${menuOpen ? ' active' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-item${active === item.href ? ' active' : ''}`}
              onClick={onNavLinkClick}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            className="btn btn-outline nav-cta"
            onClick={() => {
              onNavLinkClick();
              onRequireSignup();
            }}
          >
            Play Now
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
