import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Music2, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from '../hooks/Useauth'
import "../register.scss";

const Register = () => {
  const navigate = useNavigate()
  const { loading, handleregister } = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const submithandler = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!username.trim()) return setError('Username is required.')
    if (!email.trim()) return setError('Email is required.')
    if (!password.trim()) return setError('Password is required.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')

    try {
      await handleregister(username, email, password)
      setSuccess('Account created! Redirecting...')
      setTimeout(() => navigate('/'), 1200)
    } catch (err) {
      const msg = err?.response?.data?.message
      if (msg === ' user is already existed') {
        setError('Username or email already taken.')
      } else {
        setError('Something went wrong. Try again.')
      }
    }
  }

  return (
    <div className="register-scene">
      <div className="register-orb register-orb--violet" />
      <div className="register-orb register-orb--green" />
      <div className="register-orb register-orb--amber" />
      <div className="register-noise" />

      <div className="register-card">
        <div className="register-brand">
          <div className="register-brand__icon">
            <Music2 />
          </div>
          <span className="register-brand__name">Moodify</span>
        </div>

        <div className="register-header">
          <h1>Create account</h1>
          <p>Your mood. Your music. Your world.</p>
        </div>

        {error && (
          <div className="register-alert register-alert--error">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="register-alert register-alert--success">
            <CheckCircle size={14} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={submithandler} className="register-fields">
          <div className="register-field">
            <label htmlFor="username">Username</label>
            <div className="register-field__wrap">
              <span className="register-field__icon"><User /></span>
              <input
                id="username"
                type="text"
                placeholder="john_doe"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError('') }}
                className="register-field__input"
              />
            </div>
          </div>

          <div className="register-field">
            <label htmlFor="email">Email</label>
            <div className="register-field__wrap">
              <span className="register-field__icon"><Mail /></span>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                className="register-field__input"
              />
            </div>
          </div>

          <div className="register-field">
            <label htmlFor="password">Password</label>
            <div className="register-field__wrap">
              <span className="register-field__icon"><Lock /></span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                className="register-field__input"
              />
              <span className="register-field__eye" onClick={() => setShowPassword(p => !p)}>
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </span>
            </div>
          </div>

          <label className="register-terms">
            <input type="checkbox" required />
            <span>
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </span>
          </label>

          <button className="register-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  )
}

export default Register