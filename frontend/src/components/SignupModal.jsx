import { useEffect, useState } from 'react';

const benefits = [
  'Instant access to live results',
  'Exclusive bonuses & rewards',
  'Secure wallet & instant withdrawals',
];

function SignupModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (!submitted) return undefined;
    const timer = window.setTimeout(onClose, 1600);
    return () => window.clearTimeout(timer);
  }, [submitted, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim() || password.length < 4) {
      setError('Please fill all fields with a password of 4+ characters.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container signup-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close signup-close" onClick={onClose} type="button" aria-label="Close">
          &times;
        </button>

        {submitted ? (
          <div className="signup-success">
            <div className="signup-check">✓</div>
            <h3>Account Created!</h3>
            <p>Welcome aboard, {name.trim()}. Redirecting you to the platform...</p>
          </div>
        ) : (
          <>
            <div className="signup-head">
              <span className="signup-brand">SS BAZAR</span>
              <h3>Create Your Account</h3>
              <p className="signup-subtitle">
                Register free to unlock live results, play markets &amp; withdraw winnings.
              </p>
            </div>

            <ul className="signup-benefits">
              {benefits.map((item) => (
                <li key={item}>
                  <span className="signup-tick">✓</span> {item}
                </li>
              ))}
            </ul>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="signup-name">Full Name</label>
                <input
                  id="signup-name"
                  className="form-input"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-mobile">Mobile Number</label>
                <input
                  id="signup-mobile"
                  className="form-input"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  autoComplete="tel"
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  className="form-input"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <button className="btn btn-download signup-submit" type="submit">
                Register &amp; Start Playing
              </button>
            </form>

            <p className="signup-note">
              By registering you agree to our{' '}
              <a href="#" onClick={(e) => e.preventDefault()}>Terms &amp; Privacy Policy</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SignupModal;
