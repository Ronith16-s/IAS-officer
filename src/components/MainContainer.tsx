import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar, { setSmoother } from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollSmoother);

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [smootherReady, setSmootherReady] = useState(false);

  useGSAP(() => {
    const instance = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    instance.scrollTop(0);
    instance.paused(true);
    setSmoother(instance);
    setSmootherReady(true);

    return () => {
      instance.kill();
    };
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            {smootherReady && (
              <>
                <Landing>{!isDesktopView && children}</Landing>
                <About />
                <WhatIDo />
                <Career />
                <Work />
                {isDesktopView && (
                  <Suspense fallback={<div>Loading....</div>}>
                    <TechStack />
                  </Suspense>
                )}
                <Contact />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
