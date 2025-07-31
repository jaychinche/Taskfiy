import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:3002/login', {
        username,
        password
      });

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify({
          userId: response.data.userId,
          username,
          isLoggedIn: true
        }));
        navigate('/todos');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Inline styles for the component
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    backgroundDecoration: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    },
    blob1: {
      position: 'absolute',
      top: '-10rem',
      right: '-10rem',
      width: '20rem',
      height: '20rem',
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.1) 100%)',
      borderRadius: '50%',
      filter: 'blur(40px)'
    },
    blob2: {
      position: 'absolute',
      bottom: '-10rem',
      left: '-10rem',
      width: '20rem',
      height: '20rem',
      background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(99, 102, 241, 0.1) 100%)',
      borderRadius: '50%',
      filter: 'blur(40px)'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1.5rem',
      padding: '2.5rem',
      width: '100%',
      maxWidth: '28rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'relative',
      zIndex: 1
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    logo: {
      width: '4rem',
      height: '4rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
    },
    lockIcon: {
      width: '2rem',
      height: '2rem',
      color: 'white'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.1rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151'
    },
    inputWrapper: {
      position: 'relative'
    },
    input: {
      width: '90%',
      padding: '0.875rem 1rem 0.875rem 3rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      background: 'rgba(255, 255, 255, 0.8)',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    inputIcon: {
      position: 'absolute',
      left: '0.875rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '1.25rem',
      height: '1.25rem',
      color: '#9ca3af'
    },
    eyeButton: {
      position: 'absolute',
      right: '0.875rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#9ca3af',
      transition: 'color 0.2s ease'
    },
    eyeButtonHover: {
      color: '#6b7280'
    },
    errorMessage: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '0.75rem',
      padding: '0.75rem',
      color: '#dc2626',
      fontSize: '0.875rem',
      animation: 'slideIn 0.3s ease'
    },
    demoCredentials: {
      background: '#eff6ff',
      border: '1px solid #bfdbfe',
      borderRadius: '0.75rem',
      padding: '0.75rem',
      color: '#1d4ed8',
      fontSize: '0.875rem'
    },
    demoTitle: {
      fontWeight: '600',
      marginBottom: '0.25rem'
    },
    demoCode: {
      background: '#dbeafe',
      padding: '0.125rem 0.25rem',
      borderRadius: '0.25rem',
      fontFamily: 'monospace'
    },
    loginButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '0.875rem 1rem',
      borderRadius: '0.75rem',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.39)'
    },
    loginButtonHover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
    },
    loginButtonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
      transform: 'none'
    },
    spinner: {
      width: '1.25rem',
      height: '1.25rem',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    footer: {
      textAlign: 'center',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e5e7eb',
      marginTop: '1.5rem'
    },
    footerText: {
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    signupLink: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'color 0.2s ease'
    },
    signupLinkHover: {
      color: '#5a67d8'
    },
    securityNote: {
      textAlign: 'center',
      marginTop: '1.5rem',
      color: '#9ca3af',
      fontSize: '0.875rem'
    }
  };

  // Add CSS animations
  const cssAnimations = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        {/* Background decoration */}
        <div style={styles.backgroundDecoration}>
          <div style={styles.blob1}></div>
          <div style={styles.blob2}></div>
        </div>

        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.logo}>
              <svg style={styles.lockIcon} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>Sign in to continue to your account</p>
          </div>

          {/* Login form */}
          <form style={styles.form} onSubmit={handleLogin}>
            {/* Username field */}
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>Username</label>
              <div style={styles.inputWrapper}>
                <svg style={styles.inputIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  style={styles.input}
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, { borderColor: '#e5e7eb', boxShadow: 'none' })}
                />
              </div>
            </div>

            {/* Password field */}
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <svg style={styles.inputIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, { borderColor: '#e5e7eb', boxShadow: 'none' })}
                />
                <button
                  type="button"
                  style={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseEnter={(e) => Object.assign(e.target.style, styles.eyeButtonHover)}
                  onMouseLeave={(e) => Object.assign(e.target.style, { color: '#9ca3af' })}
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div style={styles.errorMessage}>
                {error}
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.loginButton,
                ...(isLoading ? styles.loginButtonDisabled : {})
              }}
              onMouseEnter={(e) => !isLoading && Object.assign(e.target.style, styles.loginButtonHover)}
              onMouseLeave={(e) => !isLoading && Object.assign(e.target.style, { transform: 'none', boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.39)' })}
            >
              {isLoading ? (
                <>
                  <div style={styles.spinner}></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                style={styles.signupLink}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.signupLinkHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, { color: '#667eea' })}
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Security note */}
        <div style={styles.securityNote}>
       
        </div>
      </div>
    </>
  );
};

export default LoginPage;