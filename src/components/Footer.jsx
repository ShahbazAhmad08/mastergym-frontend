import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h2>MASTER GYM</h2>
            <p className="footer-tagline">The Fitness Hub</p>
            <p>
              Transform your body, transform your life. Join us on your fitness
              journey.
            </p>
            <div className="social-links">
              <a
                href="https://www.instagram.com/master_gym_the_fitness_hub/?hl=en"
                aria-label="Instagram"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  {/* <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
                  <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
                </svg>
              </a>

              <a
                href="https://youtube.com/@mastergym1?si=SKQfzSPHp1WssrxW"
                aria-label="YouTube"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  {/* <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
                  <path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z" />
                </svg>
              </a>
            </div>
          </div>

          {/* <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/trainers">Trainers</Link>
              </li>
              <li>
                <Link to="/membership">Membership</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div> */}

          <div className="footer-section">
            <h3>Opening Hours</h3>
            <ul className="hours-list">
              <li>
                <span> SATURDAY -THURSDAY </span>
                {/* <span>6:00 AM - 10:00 PM</span> */}
              </li>
              <li>
                <span>Morning </span>
                <span>Evening</span>
              </li>
              <li>
                <span>5:00 AM - 8:00 AM for Mens</span>| &nbsp;
                <span>4:00 PM - 9:00 PM for Mens</span>
              </li>
              <li>
                <span> 9:00 AM - 11:00 AM for Ladies</span>
              </li>

              {/* <li><span>Saturday</span><span>8:00 AM - 8:00 PM</span></li>
              <li><span>Sunday</span><span>8:00 AM - 6:00 PM</span></li> */}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul className="contact-info">
              <li>
                📍 Station Road. Don Bosco Convent Road (Near Dr Javed Dental)
                Mau Aima Allahabad{" "}
              </li>
              <li>📞 7080936221</li>
              <li>
                <a href="mailto:rehanshahid000786@gmail.com">
                  rehanshahid000786@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Master Gym - The Fitness Hub. All Rights Reserved.</p>
          <p className="text-yellow-500 ">
            Developed And Maintained by SAMEER ABBASI
          </p>
          {/* <Link to="/admin" className="admin-link">
            Admin Panel
          </Link> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
