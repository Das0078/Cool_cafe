"use client";
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Carousel from '@/components/Carousel';
import CurvyMarquee from '@/components/CurvyMarquee';
import CurvedLoop from '@/components/CurvedLoop';

export default function Page() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#110a06]">
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <div className="pointer-events-none fixed left-1/2 top-20 z-30 h-[72px] w-[125vw] -translate-x-1/2 md:hidden">
            <CurvedLoop
              marqueeText="✦  cafe cool  ✦   since 2022  ✦   we pride at  ✦   what we serve"
              speed={2}
              curveAmount={-45}
              direction="right"
              interactive={false}
              className="fill-[#b79d8b] text-[5.15rem] tracking-[0.12em]"
            />
          </div>
          <Carousel />
          <CurvyMarquee />
        </>
      )}
    </main>
  );
}
