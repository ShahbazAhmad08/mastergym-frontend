import "./Services.css";

function Services() {
  const services = [
    {
      icon: "💪",
      title: "Personal Training",
      description:
        "One-on-one sessions with certified trainers who create customized workout plans based on your goals, fitness level, and schedule.",
      features: [
        "Customized workout plans",
        "Nutritional guidance",
        "Progress tracking",
        "Flexible scheduling",
      ],
    },
    {
      icon: "👩",
      title: "Separate Ladies Timings",
      description:
        "Dedicated time slots for ladies to exercise in a comfortable and supportive environment.",
      features: ["Female trainers available", "Privacy and comfort"],
    },
    {
      icon: "🥗",
      title: "Nutrition Coaching",
      description:
        "Professional nutritionists help you develop healthy eating habits and meal plans that complement your fitness routine.",
      features: [
        "Personalized meal plans",
        "Dietary assessments",
        "Supplement guidance",
        "Lifestyle coaching",
      ],
    },
    {
      icon: "🏋️",
      title: "Strength Training",
      description:
        "Comprehensive strength training programs with modern equipment and expert guidance for optimal muscle development.",
      features: [
        "State-of-the-art equipment",
        "Progressive programs",
        "Form correction",
        "Safety first approach",
      ],
    },
    {
      icon: "🏃",
      title: "Cardio Programs",
      description:
        "Heart-pumping cardio sessions designed to improve endurance, burn calories, and boost cardiovascular health.",
      features: [
        "Treadmills & ellipticals",
        "Interval training",
        "Heart rate monitoring",
        "Endurance building",
      ],
    },
  ];

  return (
    <div className="services">
      <section className="services-hero">
        <div className="container">
          <h1 className="page-title">Our Services</h1>
          <p className="page-subtitle">
            Comprehensive Fitness Solutions for Every Goal
          </p>
        </div>
      </section>

      <section className="services-content">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Not Sure Which Service is Right for You?</h2>
            <p>
              Book a free consultation with our fitness experts and we'll help
              you find the perfect program.
            </p>
            <a href="/contact" className="btn">
              Book Free Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
