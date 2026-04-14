import "../../assets/styles/contact.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function ContactUs() {
  return (
    <>
      <Navbar />

      <div className="contact-container">

        {/* 🔥 LEFT SIDE */}
        <div className="contact-left">
          <h1>Get in Touch</h1>
          <p>
            Have questions, ideas, or want to collaborate?  
            We'd love to hear from you 💬
          </p>

          <div className="contact-info">

            <div className="contact-item">
              <h3>Email</h3>
              <p>support@projectshare.com</p>
            </div>

            <div className="contact-item">
              <h3>Phone</h3>
              <p>+82 90765 78756</p>
            </div>

            <div className="contact-item">
              <h3>Location</h3>
              <p>127, Dangsan-ro, Yeongdeungpo-gu, Seoul, S.Korea</p>
            </div>

            <div className="contact-item">
              <h3>Working Hours</h3>
              <p>
                Mon - Fri: 9AM - 6PM <br />
                Sat: 10AM - 3PM <br />
                Sun: Closed
              </p>
            </div>

          </div>
        </div>

        {/* 🔥 RIGHT SIDE */}
        <div className="contact-right">

          {/* CONTACT FORM */}
          <form className="contact-form">
            <h2>Send a Message</h2>

            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>

            <button type="submit">Send Message</button>
          </form>

          {/* MAP */}
          <div className="map-box">
            <iframe
              src="https://www.google.com/maps?q=Yeongdeungpo District,Seoul, South Koreaa&output=embed"
              loading="lazy"
              title="map"
            ></iframe>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default ContactUs;