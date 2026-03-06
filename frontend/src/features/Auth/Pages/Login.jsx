import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Music2, AlertCircle } from "lucide-react";
import { useAuth } from '../hooks/Useauth'
import '../Login.scss'

const Login = () => {
  const navigate = useNavigate()
  const { loading, handlelogin } = useAuth()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const submithandler = async (e) => {
    e.preventDefault()
    setError('')

    if (!identifier.trim()) return setError('Email or username is required.')
    if (!password.trim()) return setError('Password is required.')

    try {
      await handlelogin(identifier, password)
      navigate('/')
    } catch (err) {
      const msg = err?.response?.data?.message
      if (msg === 'invalid credentials') {
        setError('Invalid email/username or password.')
      } else if (msg === 'all fields required') {
        setError('Please fill all fields.')
      } else {
        setError('Something went wrong. Try again.')
      }
    }
  }

  return (
    <div className="login-scene">
      <div className="login-orb login-orb--green" />
      <div className="login-orb login-orb--violet" />
      <div className="login-noise" />

      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand__icon">
            <Music2 />
          </div>
          <span className="login-brand__name">Moodify</span>
        </div>

        <div className="login-header">
          <h1>Welcome back</h1>
          <p>Never Lost. Discover New Music.</p>
        </div>

        {error && (
          <div className="login-error">
            <AlertCircle size={14} />
            <span className='err'>{error}</span>
          </div>
        )}

        <form onSubmit={submithandler} className="login-fields">
          <div className="login-field">
            <label htmlFor="identifier">Email or Username</label>
            <div className="login-field__wrap">
              <span className="login-field__icon"><Mail /></span>
              <input
                id="identifier"
                type="text"
                placeholder="Enter your email or username"
                value={identifier}
                onChange={(e) => { setIdentifier(e.target.value); setError('') }}
                className="login-field__input"
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <div className="login-field__wrap">
              <span className="login-field__icon"><Lock /></span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                className="login-field__input"
              />
              <span className="login-field__eye" onClick={() => setShowPassword(p => !p)}>
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </span>
            </div>
          </div>

          <div className="login-forgot">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login