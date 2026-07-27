"use client";

export default function CurvyMarquee() {
  return (
    <div className="fixed bottom-[-22vh] left-1/2 -translate-x-1/2 w-[180vw] md:w-[130vw] h-[40vh] bg-[#110a06] rounded-[50%] z-40 flex justify-center pt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] pointer-events-none">
      <svg viewBox="0 0 1000 200" className="w-[120%] md:w-[85%] h-auto max-h-[160px] overflow-visible">
        <path id="curve" d="M 0 180 Q 500 60 1000 180" fill="transparent" />
        <text className="text-[1.3rem] md:text-[1.75rem] font-bold uppercase tracking-[0.2em]" fill="#b79d8b">
          <textPath href="#curve" startOffset="0%">
            CAFE COOL ✦ SINCE 2022 ✦ WE PRIDE AT ✦ WHAT WE SERVE ✦ CAFE COOL ✦ SINCE 2022 ✦ WE PRIDE AT ✦ WHAT WE SERVE ✦ CAFE COOL ✦ SINCE 2022 ✦ WE PRIDE AT ✦ WHAT WE SERVE ✦
            <animate attributeName="startOffset" from="0%" to="-50%" dur="20s" repeatCount="indefinite" />
          </textPath>
        </text>
      </svg>
    </div>
  )
}
