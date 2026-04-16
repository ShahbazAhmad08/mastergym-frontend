import { useState } from "react";
import "./Membership.css";

function Membership() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: "Basic",
      price: "700",
      period: "month",
      description: "Perfect for beginners starting their fitness journey",
      features: [
        "Access to gym floor",
        "Cardio equipment",
        "Weight training area",
        // 'Locker room access',
        "Free Wi-Fi",
        "Operating hours access",
      ],
      highlighted: false,
    },
    {
      name: "Premium",
      price: "1500",
      period: "3 months",
      description: "Most popular choice for serious fitness enthusiasts",
      features: [
        "Access to gym floor",
        "Cardio equipment",
        "Weight training area",
        // 'Locker room access',
        "Free Wi-Fi",
        "Operating hours access",
      ],
      highlighted: true,
    },
    {
      name: "Elite",
      price: "2500",
      period: " 6 months",
      description: "Ultimate fitness experience with unlimited access",
      features: [
        "Access to gym floor",
        "Cardio equipment",
        "Weight training area",
        // 'Locker room access',
        "Free Wi-Fi",
        "Operating hours access",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="membership">
      <section className="membership-hero">
        <div className="container">
          <h1 className="page-title">Membership Plans</h1>
          <p className="page-subtitle">
            Choose the Perfect Plan for Your Fitness Goals
          </p>
        </div>
      </section>

      <section className="membership-content">
        <div className="container">
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`plan-card ${plan.highlighted ? "highlighted" : ""} ${selectedPlan === index ? "selected" : ""}`}
                onClick={() => setSelectedPlan(index)}
              >
                {plan.highlighted && (
                  <div className="popular-badge">Most Popular</div>
                )}
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="price">
                    <span className="currency">&#8377;</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                <div className="plan-features">
                  <ul>
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
                <button
                  className={`btn ${plan.highlighted ? "" : "btn-outline"}`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="membership-faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about our memberships
          </p>

          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can I cancel my membership anytime?</h3>
              <p>
                No you cannot cancel your membership anytime. You must provide
                30 days notice to cancel.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you offer student discounts?</h3>
              <p>
                Absolutely! Students with valid ID receive 15% off all
                membership plans.
              </p>
            </div>
            <div className="faq-item">
              <h3>Is there a joining fee?</h3>
              <p>
                No joining fee! You only pay the monthly membership cost.
                Special promotions may offer additional savings.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I upgrade my plan later?</h3>
              <p>
                Yes, you can upgrade your membership at any time. The price
                difference will be prorated for the remaining period.
              </p>
            </div>

            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>
                online payments via UPI, and net banking. We also accept cash
                payments at the gym.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="membership-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Still Have Questions?</h2>
            <p>
              Our team is here to help you choose the perfect membership plan.
            </p>
            <a href="/contact" className="btn">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Membership;
