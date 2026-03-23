import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CheckSquare, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  // Email differentiation logic: Block common public providers
  const isUniversityEmail = (email) => {
    const publicProviders = [
      'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 
      'icloud.com', 'aol.com', 'mail.com', 'protonmail.com'
    ];
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return false;
    
    // Check if it's in the blacklist
    if (publicProviders.includes(domain)) return false;
    
    // Check for common university patterns (.edu, .ac, .univ)
    // Most universities use .edu or .ac.uk, .edu.in etc.
    // However, to be safe, we just block the common public ones.
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!isUniversityEmail(email)) {
      return setError('Please use your university email address. Public domains like Gmail are restricted.');
    }

    try {
      setLoading(true);
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (err) {
      setError('Failed to ' + (isLogin ? 'login' : 'sign up') + ': ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="sidebar-brand" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
          <CheckSquare size={36} strokeWidth={2.5} />
          <span style={{ fontSize: '1.5rem' }}>TaskManager <span style={{ fontWeight: 400, opacity: 0.7 }}>Education</span></span>
        </div>

        <div className="login-header">
          <h2>{isLogin ? 'Welcome Back' : 'Student Registration'}</h2>
          <p>{isLogin ? 'Sign in to access your dashboard' : 'Join your university workspace'}</p>
        </div>

        {error && (
          <div className="auth-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>University Email</label>
            <input 
              type="email" 
              className="task-input" 
              placeholder="e.g. student@mit.edu" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="task-input" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button className="btn" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle-btn">
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
