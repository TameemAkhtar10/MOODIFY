import React from 'react'
import { Link } from "react-router-dom";
import { Music2 } from "lucide-react";
import '../landingpage.scss'

const Landing = () => {
  return (
    <div className="landing-scene">
      <div className="landing-bg" />
      <div className="landing-overlay" />

      <div className="landing-card">
        <div className="landing-brand">
          <Music2 className="landing-brand__icon" />
          <span className="landing-brand__name">Moodify</span>
        </div>

        <p className="landing-tagline">Never Lost. Discover New Music.</p>

        <div className="landing-actions">
          <Link to="/register" className="landing-btn landing-btn--primary">Sign Up</Link>
          <Link to="/login" className="landing-btn landing-btn--secondary">Log In</Link>
        </div>
      </div>
    </div>
  )
}

export default Landing