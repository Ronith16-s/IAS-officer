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
                <h4>BE in Information Science</h4>
                <h5>NMAM Institute of Technology</h5>
              </div>
              <h3>PRESENT</h3>
            </div>
            <p>
              Currently pursuing a Bachelor of Engineering in Information Science and Engineering (ISE). Developing knowledge in software development, database systems, computer networks, and emerging technologies while actively participating in technical and management activities.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Manual Tester</h4>
                <h5>Cydratech, Mangalore</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Gained hands-on professional experience as a Manual Tester, performing software testing, identifying and reporting bugs, executing test cases, validating application functionality, and collaborating with development teams to ensure software quality and reliability.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Pre-University Course</h4>
                <h5>Govindas PU College, Surathkal</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Completed Pre-University Course (PUC) in Science, building a strong foundation in Physics, Chemistry, Mathematics, and Biology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
