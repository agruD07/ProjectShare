
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";
import img5 from "../../assets/images/img5.jpg";
import img7 from "../../assets/images/img7.png";
import "../../assets/styles/landingpage.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";



function LandingPage() {
  return (
    <>
      
    <Navbar/>

      {/* HERO CAROUSEL */}
      <div className="carousel-container">
        <div id="projectCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {[img1, img2, img3, img4, img5].map((img, i) => (
              <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                <img src={img} className="d-block w-100 carousel-img" alt="slide" />
              </div>
            ))}
            {/* <button className="carousel-control-prev" type="button" data-bs-target="#projectCarousel" data-bs-slide="prev"> <span className="carousel-control-prev-icon"></span> </button> <button className="carousel-control-next" type="button" data-bs-target="#projectCarousel" data-bs-slide="next"> <span className="carousel-control-next-icon"></span> </button> */}
          </div>
        </div>

        {/* OVERLAY CONTENT */}
        <div className="carousel-overlay">
          <h1>Bring Your Ideas to Life, Together.</h1>
          <p>
              ProjectShare connects creators with collaborators and mentors to build
            innovative projects. Find the skills you need or the ideas you want to work on.
          </p>
          

          <div className="hero-buttons">
            <Link to="/register/collaborator" className="btn btn-light me-3">
              Find Projects
            </Link>
            <Link to="/register/creator" className="btn btn-outline-light">
              Find Collaborators
            </Link>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="info-section">
        <div className="container">
          <div className="info-card">
            <div className="row align-items-center g-5">

              {/* LEFT: TEXT */}
              <div className="col-md-6">
              
                <h2>What is ProjectShare?</h2>
                <p>
                  ProjectShare is an innovative collaborative project and idea marketplace
                  designed to bridge the gap between individuals with creative ideas and those
                  with the skills to bring them to life.
                  <br />
                  Our goal is to empower individuals to transform ideas into successful projects
                  by integrating seamless communication, project tracking, and collaboration
                  tools within a secure and engaging community.
                </p>
              </div>

              {/* RIGHT: IMAGE */}
              <div className="col-md-6 text-center">
                <img src={img7} alt="About ProjectShare" className="landing-img"/>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECOND INFO SECTION */}
      <section className="info-section info-section-alt">
        <div className="container">
          <div className="info-card">
            <div className="row align-items-center g-5">

              {/* LEFT: IMAGE */}
              <div className="col-md-6 text-center">
                <img src={img3} alt="How ProjectShare Helps" className="about-img"/>
              </div>

              {/* RIGHT: TEXT */}
              <div className="col-md-6">
                <h2>How ProjectShare Can Help You</h2>

                <p>
                  ProjectShare is built to support creators, collaborators, and mentors
                  throughout their journey.
                </p>

                <ul className="info-list">
                  <li>Connect with skilled collaborators or find exciting projects.</li>
                  <li>Manage your projects with built-in tools.</li>
                  <li>Build your portfolio and showcase your contributions.</li>
                  <li>Get guidance from experienced mentors.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FEATURES */}
      <section className="landing-features-section">
        <div className="container">
          <h2 className="text-center mb-5 text-white">
            Everything You Need to Collaborate
          </h2>

          <div className="row g-4">
            {[
              ["Skill-Based Matching", "Find collaborators with the right skills"],
              ["Project Management", "Track progress and manage tasks"],
              ["Portfolio Building", "Showcase your contributions"],
              ["Mentorship", "Get guidance from experts"],
              ["Communication", "Chat with your team"],
              ["Secure Platform", "Safe and verified collaboration"],
            ].map(([title, desc], i) => (
              <div key={i} className="col-md-4">
                <div className="landing-feature-card">
                  <h5>{title}</h5>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default LandingPage;
