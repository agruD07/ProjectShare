import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../assets/styles/about.css";
import img6 from "../../assets/images/img6.jpg";
import img5 from "../../assets/images/img5.jpg";
import img8 from "../../assets/images/img8.jpg";

function About() {
  return (
    <>
      <Navbar />

      <div className="about-container">

        {/* HERO */}
        <section className="about-hero">
          <h1>
            <span className="brand-project">About - Project</span>
            <span className="brand-share">Share</span>
        </h1>
          <p>
        
            ProjectShare is an innovative platform that connects ideas with talent.
            We bridge the gap between creators, collaborators, and mentors to build
            impactful projects together.
          </p>
        </section>

        {/* FEATURES */}
        <section className="about-features">
          <h2>Features</h2>

          <div className="about-feature-grid">
            <div className="about-feature-card">
                <h5>Skill-Based Matching</h5>
                {/* <p>Ensuring project creators find the right talent.</p> */}
                </div>
            <div className="about-feature-card">
                <h5>Project Management Tools</h5>
                {/* <p>Task lists and progress tracking for efficient collaboration.</p> */}
                </div>
            <div className="about-feature-card">
                <h5>Portfolio Building</h5>
                {/* <p>Allowing collaborators to showcase their contributions.</p> */}
                </div>
            <div className="about-feature-card">
                <h5>Mentorship Opportunities</h5>
                {/* <p>Fostering knowledge-sharing and professional growth.</p> */}
                </div>
            <div className="about-feature-card">
                <h5>Idea Sharing & Feedback</h5>
                {/* <p>Creating a dynamic environment for innovation.</p> */}
                </div>
            <div className="about-feature-card">
                <h5>Seamless Communication</h5>
                {/* <p>Integrated tools for effective team interaction.</p> */}
                </div>
          </div>
        </section>

        {/* USER GROUP */}
        <section className="about-section">
          <div className="about-text">
            <h2>Who Benefits?</h2>
            <p>
              ProjectShare connects Creators, Collaborators, Mentors, and Admins.
              Each role has unique tools to ensure project success and smooth collaboration.
            </p>
          </div>

          <img src={img8} alt="users" className="about-img" />
        </section>

        {/* PROBLEM */}
        <section className="about-section reverse">
          <div className="about-text">
            <h2>Problems in Existing Systems</h2>
            <p>
              Traditional collaboration is fragmented. Multiple tools, no proper
              tracking, and no structured skill matching make teamwork inefficient.
            </p>
          </div>

          <img src={img5} alt="problems" className="about-img" />
        </section>

        {/* SOLUTION */}
        <section className="about-section">
          <div className="about-text">
            <h2>Our Solution</h2>
            <p>
              ProjectShare provides an all-in-one platform with skill matching,
              mentorship, and project tracking — making collaboration seamless and effective.
            </p>
          </div>

          <img src={img6} alt="solution" className="about-img" />
        </section>

        {/* CTA */}
        <section className="about-cta">
          <h2>Start Your Journey Today 🚀</h2>
          <button onClick={() => window.location.href = "/register/creator"}>
            Get Started
          </button>
        </section>

      </div>

      <Footer />
    </>
  );
}

export default About;