import { useEffect, useState } from 'react';

const benefits = [
  'Instant access to live results',
  'Exclusive bonuses & rewards',
  'Secure wallet & instant withdrawals',
];

const content = {
  signup: {
    title: 'Create Your Account',
    subtitle: 'Register free to unlock live results, play markets & withdraw winnings.',
    submit: 'Register & Start Playing',
    successTitle: 'Account Created!',
    successText: 'Welcome aboard! Redirecting you to the platform...',
    switchText: 'Already have an account?',
    switchAction: 'Sign In',
  },
  login: {
    title: 'Welcome Back',
    subtitle: 'Sign in to continue to your dashboard.',
    submit: 'Sign In',
    successTitle: 'Welcome Back!',
    successText: 'Signing you into your account...',
    switchText: 'New to SS BAZAR?',
    switchAction: 'Create Account',
  },
  forgot: {
    title: 'Reset Your Password',
    subtitle: 'Enter your registered mobile number and we will send a reset link.',
    submit: 'Send Reset Link',
    successTitle: 'Reset Link Sent!',
    successText: 'Check your mobile for instructions to reset your password.',
    switchText: 'Remembered it?',
    switchAction: 'Back to Sign In',
  },
};

function SignupModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('signup');
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

  const current = content[mode];
  const isSignup = mode === 'signup';
  const isLogin = mode === 'login';

  const switchMode = (nextMode) => {
    setError('');
    setSubmitted(false);
    setMode(nextMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'forgot') {
      if (!mobile.trim()) {
        setError('Enter your registered mobile number.');
        return;
      }
      setError('');
      setSubmitted(true);
      return;
    }

    if (isSignup && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (mobile.trim().length !== 10) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    if (isSignup && password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
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
            <h3>{current.successTitle}</h3>
            <p>{current.successText}</p>
          </div>
        ) : (
          <>
            <div className="signup-head">
              <span className="signup-brand">SS BAZAR</span>
              <h3>{current.title}</h3>
              <p className="signup-subtitle">{current.subtitle}</p>
            </div>

            {isSignup || isLogin ? (
              <div className="signup-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isSignup}
                  className={`signup-tab${isSignup ? ' active' : ''}`}
                  onClick={() => switchMode('signup')}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isLogin}
                  className={`signup-tab${isLogin ? ' active' : ''}`}
                  onClick={() => switchMode('login')}
                >
                  Sign In
                </button>
              </div>
            ) : null}

            {isSignup && (
              <ul className="signup-benefits">
                {benefits.map((item) => (
                  <li key={item}>
                    <span className="signup-tick">✓</span> {item}
                  </li>
                ))}
              </ul>
            )}

            <form className="signup-form" onSubmit={handleSubmit}>
              {isSignup && (
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
              )}

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

              {mode !== 'forgot' && (
                <div className="form-group">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    className="form-input"
                    type="password"
                    placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={isSignup ? 'new-password' : 'current-password'}
                  />
                </div>
              )}

              {isLogin && (
                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => switchMode('forgot')}
                >
                  Forgot Password?
                </button>
              )}

              {error && <p className="form-error">{error}</p>}

              <button className="btn btn-download signup-submit" type="submit">
                {current.submit}
              </button>
            </form>

            <div className="signup-switch">
              <span>{current.switchText}</span>
              <button
                type="button"
                className="signup-switch-action"
                onClick={() => switchMode(isLogin ? 'signup' : 'login')}
              >
                {current.switchAction}
              </button>
            </div>

            {isSignup && (
              <p className="signup-note">
                By registering you agree to our{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>Terms &amp; Privacy Policy</a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SignupModal;
