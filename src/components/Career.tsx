import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Pre-University Course</h4>
                <h5>Expert Pre-University College</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed Pre-University Course (PUC) in Science, building a strong base in Physics, Chemistry, Mathematics, and Computer Science.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BE in Information Science</h4>
                <h5>NMAM Institute of Technology</h5>
              </div>
              <h3>PRESENT</h3>
            </div>
            <p>
              Currently pursuing a Bachelor of Engineering in Information Science and Engineering (ISE). Actively learning software development, database design, computer systems, and emerging technologies.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer</h4>
                <h5>Noesys Software, Bangalore</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Gained hands-on professional experience developing software, working with databases to solve problems, and collaborating on building scalable digital solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
