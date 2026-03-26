import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(form.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!form.password.trim()) {
      errs.password = 'Password is required';
    } else if (form.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('auth_token', 'mock_token_' + Date.now());
      localStorage.setItem('user_email', form.email);
      navigate('/dashboard');
    }, 900);
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-grid" aria-hidden="true" />
        <div className="login-glow" aria-hidden="true" />
      </div>

      <div className="login-box">
        <div className="login-brand">
          <span className="brand-mark">S</span>
          <span className="brand-name">ShelfLine</span>
        </div>

        <div className="login-header">
          <h1>Welcome back</h1>
          <p>Sign in to access your product dashboard</p>
        </div>

        <form className="login-form" onSubmit={handleLogin} noValidate>
          <div className={`field ${errors.email ? 'field--error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className={`field ${errors.password ? 'field--error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : 'Sign In'}
          </button>
        </form>

        <p className="login-hint">
          Use any email &amp; password (6+ chars) to sign in
        </p>
      </div>
    </div>
  );
}
