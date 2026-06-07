import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "Facial Feature Measurement Using ArUco Markers",
    category: "Computer Vision / OpenCV",
    tools: "Python, OpenCV, Image Processing, ArUco Markers",
    link: "https://github.com/Ronith16-s",
    image: "/images/facial_aruco.png"
  },
  {
    title: "Decentralized Identity Verification",
    category: "Blockchain / Web3",
    tools: "Solidity, Ethereum, IPFS, Smart Contracts, Web3",
    link: "https://github.com/Ronith16-s",
    image: "/images/blockchain_id.png"
  },
  {
    title: "Nasal–Jaw Distance Measurement System",
    category: "IEEE Research Publication",
    tools: "Computer Vision, Dental Applications, OpenCV, Research Paper",
    link: "https://github.com/Ronith16-s",
    image: "/images/dental_system.png"
  },
  {
    title: "Google Project Management",
    category: "Professional Certification",
    tools: "Agile, Scrum, Risk Management, Workflows",
    link: "https://github.com/Ronith16-s",
    image: "/images/project_mgmt.png"
  },
  {
    title: "Interactive 3D Developer Portfolio",
    category: "Web Development / Creative UI",
    tools: "React, Vite, Three.js, GSAP, R3F, HTML/CSS",
    link: "https://github.com/Ronith16-s",
    image: "/images/portfolio_site.png"
  }
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
