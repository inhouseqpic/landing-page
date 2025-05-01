import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [counters, setCounters] = useState({
    admissions: 0,
    countries: 0,
    scholarship: 0,
    universities: 0
  });

  useEffect(() => {
    // Target values
    const targetValues = {
      admissions: 2000,
      countries: 180,
      scholarship: 100,
      universities: 1100
    };

    // Animation duration in milliseconds
    const duration = 2000;
    const startTime = Date.now();

    const animateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        admissions: Math.floor(progress * targetValues.admissions),
        countries: Math.floor(progress * targetValues.countries),
        scholarship: Math.floor(progress * targetValues.scholarship),
        universities: Math.floor(progress * targetValues.universities)
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    animateCounters();

    // Store visit in localStorage to persist across refreshes
    localStorage.setItem('pageVisited', 'true');
  }, []);

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-heading">
          <h1>Unlock Opportunities At The Top Global Universities</h1>
          <h2>Our Mission: Study Abroad Made Simple</h2>
        </div>
        
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">{counters.admissions.toLocaleString()}+</div>
            <div className="stat-label">Admissions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{counters.countries}+</div>
            <div className="stat-label">Countries</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">Up to {counters.scholarship}%</div>
            <div className="stat-label">Scholarship</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{counters.universities.toLocaleString()}+</div>
            <div className="stat-label">Universities</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;