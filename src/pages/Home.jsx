import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-wrapper">
            <div className="hero-content">
              <h1 className="hero-title">
                Welcome to <span>Master Gym</span>
              </h1>
              <p className="hero-subtitle">The Fitness Hub</p>
              <p className="hero-description">
                Transform your body, elevate your mind, and achieve your fitness
                goals with our world-class facilities and expert trainers.
              </p>
              <div className="hero-buttons">
                <Link to="/membership" className="btn">
                  Start Your Journey
                </Link>
                <Link to="/about" className="btn btn-outline">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img src="/src/pages/rehan.jpeg" alt="Rehan - Master Gym" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Discover what makes Master Gym the ultimate fitness destination
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Modern Equipment</h3>
              <p>
                State-of-the-art fitness equipment from leading brands to
                maximize your workout potential.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Expert Trainers</h3>
              <p>
                Certified personal trainers dedicated to helping you achieve
                your fitness goals safely and effectively.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🕐</div>
              <h3>Flexible Hours</h3>
              <p>
                Open early to late, 7 days a week. Train on your schedule with
                24/7 access for premium members.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Personalized Plans</h3>
              <p>
                Custom workout and nutrition plans tailored to your specific
                goals and fitness level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Active Members</p>
            </div>
            <div className="stat-item">
              <h3>5+</h3>
              <p>Expert Trainers</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Weekly Classes</p>
            </div>
            <div className="stat-item">
              <h3>7+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Life?</h2>
            <p>
              Join Master Gym today and take the first step towards a healthier,
              stronger you.
            </p>
            <Link to="/contact" className="btn">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
