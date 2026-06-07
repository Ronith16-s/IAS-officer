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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [smootherReady, setSmootherReady] = useState(false);

  useGSAP(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const smootherObj = {
      paused(state: boolean) {
        if (state) lenis.stop();
        else lenis.start();
      },
      scrollTo(target: any, _duration?: boolean | number, _offset?: string) {
        lenis.scrollTo(target);
      },
    };

    setSmoother(smootherObj);
    setSmootherReady(true);

    return () => {
      lenis.destroy();
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
