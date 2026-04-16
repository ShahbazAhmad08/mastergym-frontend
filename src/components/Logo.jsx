import './Logo.css'

function Logo({ size = 'medium' }) {
  return (
    <div className={`logo ${size}`}>
      <div className="logo-icon">
        <svg viewBox="0 0 100 100" className="logo-svg">
          {/* Barbell */}
          <rect x="10" y="45" width="80" height="10" rx="5" fill="currentColor" />
          <rect x="5" y="35" width="15" height="30" rx="3" fill="currentColor" />
          <rect x="80" y="35" width="15" height="30" rx="3" fill="currentColor" />
          <rect x="15" y="40" width="10" height="20" rx="2" fill="currentColor" opacity="0.7" />
          <rect x="75" y="40" width="10" height="20" rx="2" fill="currentColor" opacity="0.7" />
          
          {/* Crown/Master symbol */}
          <polygon points="50,15 40,25 45,25 50,20 55,25 60,25" fill="currentColor" />
        </svg>
      </div>
      <div className="logo-text">
        <h1 className="logo-title">MASTER GYM</h1>
        <p className="logo-tagline">THE FITNESS HUB</p>
      </div>
    </div>
  )
}

export default Logo
