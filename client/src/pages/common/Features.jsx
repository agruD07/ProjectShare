import "../../assets/styles/features.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import collab from "../../assets/images/collab.jpg";
import progress from "../../assets/images/progress.jpg";
import mentor from "../../assets/images/mentor.png";

function Features() {
  return (
    <>
    <Navbar/>
    <div className="features-container">

      {/*HERO */}
      <section className="features-hero">
        <h1>
          Explore <span className="brand-project">Project</span>
          <span className="brand-share">Share</span> Features
        </h1>
        <p>
          Discover powerful tools designed to connect creators, collaborators, and mentors — all in one platform.
        </p>
      </section>

      {/* FEATURE GRID */}
      <section className="feature-features">
        <h2>Key Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h5>Skill-Based Matching</h5>
            <p>
              Find the right collaborators based on skills, ensuring efficient and meaningful project building.
            </p>
          </div>

          <div className="feature-card">
            <h5>Project Management</h5>
            <p>
              Organize tasks, track progress, and manage your entire project lifecycle seamlessly.
            </p>
          </div>

          <div className="feature-card">
            <h5>Portfolio Building</h5>
            <p>
              Showcase your work and contributions to build a strong professional portfolio.
            </p>
          </div>

          <div className="feature-card">
            <h5>Mentorship</h5>
            <p>
              Connect with experienced mentors to guide and improve your project outcomes.
            </p>
          </div>

          <div className="feature-card">
            <h5>Integrated Chat</h5>
            <p>
              Communicate easily with your team, mentors, and collaborators in real-time.
            </p>
          </div>

          <div className="feature-card">
            <h5>Secure Platform</h5>
            <p>
              Verified users and admin moderation ensure a safe and trustworthy environment.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 1 */}
      <section className="features-section">
        <div className="features-text">
          <h2>Smart Collaboration</h2>
          <p>
            ProjectShare makes collaboration structured and efficient. Creators can define their needs,
            and collaborators can apply based on their expertise.
          </p>
        </div>
        <img src={collab} alt="Collaboration" className="about-img" />
      </section>

      {/* SECTION 2 */}
      <section className="features-section reverse">
        <div className="features-text">
          <h2>Track Progress Easily</h2>
          <p>
            With built-in task management and progress tracking, you always know how your project is moving forward.
          </p>
        </div>
        <img src={progress} alt="Progress" className="about-img" />
      </section>

      {/* SECTION 3 */}
      <section className="features-section">
        <div className="features-text">
          <h2>Grow With Mentorship</h2>
          <p>
            Learn from experienced mentors who can guide you, review your work, and help you succeed faster.
          </p>
        </div>
        <img src={mentor} alt="Mentorship" className="about-img" />
      </section>

      {/* CTA */}
      <section className="features-cta">
        <h2>Start Building Your Future Today 🚀</h2>
        <p>Join ProjectShare and turn your ideas into real projects.</p>

        <Link to="/register/creator">
          <button>Get Started</button>
        </Link>
      </section>

    </div>
    <Footer/>
    </>
  );
}

export default Features;