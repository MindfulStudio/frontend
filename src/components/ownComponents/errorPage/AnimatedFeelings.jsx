import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HighlightText from "@/components/typo/HighlightText";
import IlluAnspannung from "/src/assets/feelingsFamilies/Vector_Anspannung.svg";
import IlluEntspannung from "/src/assets/feelingsFamilies/Vector_Entspannung.svg";
import IlluFreude from "/src/assets/feelingsFamilies/Vector_Freude.svg";
import IlluGemischteGefühle from "/src/assets/feelingsFamilies/Vector_gemGefühle.svg";
import IlluTrauer from "/src/assets/feelingsFamilies/Vector_Trauer.svg";

const AnimatedSVG = () => {
  const svgContainerRef = useRef(null);
  const shadowRef = useRef(null);
  const hitLinesRef = useRef(null);
  const [currentSVG, setCurrentSVG] = useState(0);

  const svgArr = [
    IlluAnspannung,
    IlluFreude,
    IlluGemischteGefühle,
    IlluEntspannung,
    IlluTrauer,
  ];
  const hitColorArr = ["#111", "#F7894A", "#00BCF2", "#F03A17", "#00BCF2"];

  useEffect(() => {
    let count = 0;
    const scale = 1.5;

    gsap.set("svg", { visibility: "visible" });

    gsap.set(svgContainerRef.current, {
      transformOrigin: "50% 50%",
      scale: scale,
    });

    gsap.set([shadowRef.current], { transformOrigin: "50% 50%" }); // set transform origin for the shadow

    // HITLINE ANIMATION
    const hitLine = gsap.timeline();
    hitLine
      .fromTo(
        "#hitLines line",
        { strokeDasharray: "0 100", strokeDashoffset: 100 },
        {
          duration: 2,
          strokeDasharray: "50 100",
          strokeDashoffset: 50,
          ease: "none",
        }
      )
      .to("#hitLines line", {
        duration: 2,
        strokeDasharray: "60 100",
        strokeDashoffset: 40,
        ease: "none",
      })
      .to("#hitLines line", {
        duration: 0.4,
        strokeDasharray: "100 100",
        strokeDashoffset: 0,
        ease: "sine.out",
      });

    const mainTl = gsap.timeline({ repeat: -1 });
    mainTl
      // MOVE UP
      .from(svgContainerRef.current, {
        duration: 1,
        y: -20,
        ease: "power1.inOut",
      })
      // SCALE
      .from(
        svgContainerRef.current,
        {
          duration: 0.7,
          scaleX: scale / 1.2,
          ease: "power3.in",
        },
        0
      )
      .from(
        shadowRef.current,
        {
          duration: 0.7,
          scaleX: 0.3,
          alpha: 0.2,
          ease: "power3.in",
        },
        "-=0.7" // start at the same time as the scale
      )
      .add(() => {
        hitTl.restart();
        gsap.set(hitLinesRef.current, { stroke: hitColorArr[count] });
      })
      .to(svgContainerRef.current, {
        duration: 0.3,
        scaleY: scale / 1.5,
        scaleX: scale / 1.5,
      })
      .addLabel("hit")
      .to(
        svgContainerRef.current,
        {
          duration: 0.13,
          scaleY: scale,
          scaleX: scale / 1.2,
          ease: "expo.out",
        },
        "+=0.1"
      )
      .add(onRepeat, "-=0.08")
      .to(
        svgContainerRef.current,
        {
          duration: 0.7,
          y: -100,
          ease: "power1.out",
        },
        "-=0.1"
      )
      .to(
        shadowRef.current,
        {
          duration: 0.7,
          scaleX: 0.3,
          alpha: 0.2,
          ease: "power3.out",
        },
        "-=0.7"
      );

    // CHANGE SVGs
    function onRepeat() {
      count = (count + 1) % svgArr.length;
      setCurrentSVG(count);
    }

    return () => {
      mainTl.kill();
      hitLine.kill();
    };
  }, []);

  const CurrentSVGComponent = svgArr[currentSVG];

  return (
    <div>
      <svg
        className="w-full h-full"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="svgContainer" ref={svgContainerRef}>
          <foreignObject x="125" y="270" width="100%" height="100%">
            <CurrentSVGComponent />
          </foreignObject>
        </g>
        <g
          id="hitLines"
          transform="translate(-10,0)"
          strokeWidth="4"
          fill="none"
          stroke="#FFC83D"
          strokeMiterlimit="10"
          strokeLinecap="round"
          ref={hitLinesRef}
        >
          <line x1="362.5" y1="400.5" x2="339.5" y2="404.5" />
          <line x1="361.6" y1="392.32" x2="339.5" y2="386.5" opacity="0.7" />
          <line x1="457.14" y1="391.53" x2="486.71" y2="382.12" opacity="0.7" />
          <line x1="456.5" y1="400.5" x2="478.5" y2="404.5" />
        </g>
        <g id="shadow" ref={shadowRef}>
          <line
            x1="360"
            y1="404"
            x2="440"
            y2="404"
            stroke="#111"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedSVG;
