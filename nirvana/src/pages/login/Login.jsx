import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both work email and password.');
      return;
    }
    setError('');
    onLoginSuccess();
    navigate('/dashboard');
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
      <div className="card shadow-sm border-0 p-4 p-md-5" style={{ maxWidth: '480px', width: '100%' }}>
        <h1 className="fw-bold fs-3 mb-1">Nirvana Recruitment Hub</h1>
        <p className="text-muted mb-4">Sign in to continue your recruitment journey.</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-envelope text-nv-orange me-1"></i>Work email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="username"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              <i className="bi bi-lock text-nv-orange me-1"></i>Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-nv-orange w-100 fw-semibold py-2">
            Login
          </button>
        </form>

        <p className="text-center text-muted small mt-4 mb-0">
          Secure sign in for Nirvana Recruitment Hub
        </p>
      </div>
    </div>
  );
}