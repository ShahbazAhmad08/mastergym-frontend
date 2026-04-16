import "./About.css";

function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="container">
          <h1 className="page-title">About Master Gym</h1>
          <p className="page-subtitle">Your Journey to Fitness Starts Here</p>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2019, Master Gym by <b>REHAN SHAHID</b>- The Fitness
                Hub has grown from a small local gym to one of the most trusted
                fitness centers in the Town. Our mission has always been simple:
                to provide a good fitness experience that transforms lives.
              </p>
              <p>
                We believe that fitness is not just about building muscles; it's
                about building confidence, discipline, and a healthier
                lifestyle. Our state-of-the-art facility, equipped with the
                latest fitness technology and equipment.
              </p>
              <p>
                What sets us apart is our community. We've created an
                environment where beginners and athletes alike feel welcome,
                supported, and motivated to push their limits.
              </p>
            </div>
            <div className="story-image">
              <img
                src="./about-gym.jpeg"
                alt="Master Gym Facilities"
                className="responsive-image"
              />

              {/* <div className="image-placeholder"></div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do
          </p>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Excellence</h3>
              <p>
                We strive for excellence in every aspect of our service, from
                equipment quality to trainer expertise.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>
                Building a supportive fitness community where members motivate
                and inspire each other.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>
                Continuously updating our methods, equipment, and programs to
                deliver the best fitness experience.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Wellness</h3>
              <p>
                Promoting holistic health that encompasses physical fitness,
                mental well-being, and nutrition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-facilities">
        <div className="container">
          <h2 className="section-title">Our Facilities</h2>
          <p className="section-subtitle">Everything you need under one roof</p>

          <div className="facilities-list">
            <div className="facility-item">
              <h3>💪 Weight Training Area</h3>
              <p>
                Extensive selection of free weights, machines, and functional
                training equipment
              </p>
            </div>
            <div className="facility-item">
              <h3>🏃 Cardio Zone</h3>
              <p>
                Treadmills, ellipticals, stationary bikes, and rowing machines
                with entertainment systems
              </p>
            </div>
            <div className="facility-item">
              <h3>🧘 Group Training </h3>
              <p>
                Dedicated space for yoga, Zumba, spinning, HIIT, and various
                group classes
              </p>
            </div>
            <div className="facility-item">
              <h3>🥊 Customize diet plans</h3>
              <p>
                Personalized nutrition plans created by our expert dietitians to
                complement your fitness goals
              </p>
            </div>
            <div className="facility-item">
              <h3>🚿 Personal Training </h3>
              <p>
                One-on-one sessions with certified trainers to achieve your
                fitness goals
              </p>
            </div>
            <div className="facility-item">
              <h3>🥤 Separate ladies timings</h3>
              <p>
                Dedicated hours for women to work out in a comfortable and
                supportive environment
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
