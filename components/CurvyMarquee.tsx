"use client";

import CurvedLoop from './CurvedLoop';

export default function CurvyMarquee() {
  return (
    <div className="fixed bottom-[-22vh] left-1/2 z-40 hidden h-[40vh] w-[180vw] -translate-x-1/2 justify-center overflow-hidden rounded-[50%] bg-[#110a06] pt-8 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] md:flex md:w-[130vw] md:pt-12">
      <div className="h-[130px] w-[120%] md:h-[170px] md:w-[85%]">
        <CurvedLoop
          marqueeText="✦  cafe cool  ✦   since 2022  ✦   we pride at  ✦   what we serve"
          speed={2}
          curveAmount={-80}
          direction="right"
          interactive
          className="fill-[#b79d8b] text-[1.25rem] tracking-[0.18em] md:text-[1.75rem] md:tracking-[0.2em]"
        />
      </div>
    </div>
  );

}
