import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ownerNumber = "917080936221";

    const message = `
Hello Master Gym,

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}
    `;

    const whatsappURL = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact">
      <section className="contact-hero">
        <div className="container">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">We'd Love to Hear From You</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>
                Have questions about our gym, membership, or services? Reach out
                to us and our team will be happy to assist you.
              </p>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div className="info-text">
                    <h3>Location</h3>
                    <p>
                      Station Road. Don Bosco Convent Road (Near Dr Javed
                      Dental) Mau Aima Allahabad{" "}
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">📞</div>
                  <div className="info-text">
                    <h3>Phone</h3>
                    <p>7080936221</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">✉️</div>
                  <div className="info-text">
                    <h3>Email</h3>
                    <a href="mailto:rehanshahid000786@gmail.com">
                      rehanshahid000786@gmail.com
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">🕐</div>
                  <div className="info-text">
                    <h3>Available 24/7</h3>
                    <p>
                      Our support team is available around the clock to answer
                      your questions and provide assistance whenever you need
                      it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="social-media">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a
                    href="https://www.instagram.com/master_gym_the_fitness_hub/?hl=en"
                    aria-label="Instagram"
                    target="_blank"
                  >
                    IG
                  </a>

                  <a
                    href="https://youtube.com/@mastergym1?si=SKQfzSPHp1WssrxW"
                    aria-label="YouTube"
                    target="_blank"
                  >
                    YT
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn">
                  Send to WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map">
        <div className="container">
          <h2 className="section-title">Find Us Here</h2>

          <div className="map-placeholder">
            <div className="map-content">
              <span>🗺️</span>
              <p>Interactive Map</p>
              <p className="map-address">
                123 Fitness Street, Gym City, GC 12345
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
