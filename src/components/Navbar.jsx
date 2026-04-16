import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <h1>MASTER GYM</h1>
            <span className="logo-subtitle">The Fitness Hub</span>
          </Link>

          <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link to="/services" className="nav-link" onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link to="/trainers" className="nav-link" onClick={() => setIsOpen(false)}>
              Trainers
            </Link>
            <Link to="/membership" className="nav-link" onClick={() => setIsOpen(false)}>
              Membership
            </Link>
            <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link to="/membership" className="btn nav-cta" onClick={() => setIsOpen(false)}>
              Join Now
            </Link>
          </div>

          <button className={`navbar-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
