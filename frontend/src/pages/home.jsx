import "../css/style.css";
import "../css/home.css";
import VideoBg from "../videos/ctc_hero.mp4";
import FeatureCard from "./components/featureCard";
import TeamCard from "./components/teamCard";
// import sample from "../img/sample.jpg";
import LM_FT from "../img/lm_ft.png";
import JO_FT from "../img/jo_ft.png";
import OJT_FT from "../img/ojt_ft.png";
import TESDA_FT from "../img/tesda_ft.png";
import ContactSection from "./components/contact";
import FooterSection from "./components/footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/home-modern.css";

export default function Home() {
  const [description, setDescription] = useState("");
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true); // Spinner state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));

  const navigateToJobOpportunities = () => {
    navigate("/job-opportunities");
  };

  const navigateToTesdaCourses = () => {
    navigate("/tesda-courses");
  };

  const navigateToOJT = () => {
    navigate("/ojt-companies");
  };

  const navigateToLearningMaterials = () => {
    navigate("/learning-resources");
  };

  const APP_URL = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    fetch(
      `${APP_URL}/api/user-display-basic-info?title=What%20is%20CivilTech%20Connect`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setDescription(data.description); // Set the fetched description
        }
      })
      .catch((error) => {
        console.error("Error fetching the description:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched
      });

    fetch(`${APP_URL}/api/user-display-founder`) // Adjust API endpoint if necessary
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch founders data");
        }
        return response.json();
      })
      .then((data) => {
        setFounders(data); // Set the fetched founders' data
      })
      .catch((error) => {
        console.error("Error fetching founders:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched
      });
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="homeSection">
          <section className="heroSection">
            <div className="vid-bg-container">
              <video
                className="bg-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
              >
                <source src={VideoBg} type="video/mp4" />
              </video>
            </div>

            <div className="overlay-text-hero">
              <h1 className="welcome">Welcome To</h1>
              <h1 className="web-title">CivilTech Connect</h1>
              <p className="hero-tagline">
                Learning resources, TESDA courses, jobs and OJT placements for
                Civil Technology students, all in one place.
              </p>
              <div className="hero-actions">
                <button
                  type="button"
                  className="hero-btn primary"
                  onClick={navigateToLearningMaterials}
                >
                  Start learning
                </button>
                <button
                  type="button"
                  className="hero-btn"
                  onClick={navigateToOJT}
                >
                  Find OJT companies
                </button>
              </div>
            </div>
          </section>

          <section className="overview">
            <div className="section-inner overview-grid">
              <h2 className="overview-title">
                What is <span className="highlighted-text">CivilTech Connect?</span>
              </h2>
              <p className="overview-copy">
                {description ||
                  "CivilTech Connect is a student-centered platform that brings learning materials, TESDA courses, job openings and on-the-job-training placements together for Civil Technology students."}
              </p>
            </div>
          </section>

          <section className="features">
            <div className="section-inner">
              <div className="section-head">
                <h2 className="section-title">What we offer</h2>
                <p className="section-sub">
                  Everything you need from first lesson to first job.
                </p>
              </div>

              <div className="offer-list">
                <FeatureCard
                  imgSrc={LM_FT}
                  label="Learning Resources"
                  desc="A curated collection of resources designed to support Civil Technology students in mastering key concepts."
                  navigate={navigateToLearningMaterials}
                />

                <FeatureCard
                  imgSrc={TESDA_FT}
                  label="TESDA Courses"
                  desc="Specialized technical programs to enhance skills in Civil Technology, equipping students for certification and careers in the construction industry."
                  navigate={navigateToTesdaCourses}
                />

                <FeatureCard
                  imgSrc={JO_FT}
                  label="Job Opportunities"
                  desc="A platform connecting Civil Technology graduates to employment options that align with your academic training and skills."
                  navigate={navigateToJobOpportunities}
                />

                <FeatureCard
                  imgSrc={OJT_FT}
                  title="OJT Companies"
                  label="OJT Companies"
                  desc="On-the-Job Training (OJT) placements that immerse Civil Technology students in real-world construction projects."
                  navigate={navigateToOJT}
                  user={studentInfo}
                />
              </div>
            </div>
          </section>

          <section className="team">
            <div className="section-inner">
              <div className="section-head">
                <h2 className="section-title">The founders</h2>
                <p className="section-sub">
                  Meet the visionaries behind CivilTech Connect.
                </p>
              </div>

              <div className="team-grid">
                {founders.map((founder) => (
                  <TeamCard
                    key={founder.id}
                    img={founder.img}
                    name={founder.name}
                  />
                ))}
              </div>
            </div>
          </section>

          <ContactSection />
          <FooterSection />
        </div>
      )}
    </>
  );
}
