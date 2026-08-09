"use client";
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Carousel from '@/components/Carousel';
import CurvyMarquee from '@/components/CurvyMarquee';
import CurvedLoop from '@/components/CurvedLoop';
import MenuSection from '@/components/MenuSection';
import AboutSection from '@/components/about/AboutSection';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';

export default function Page() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative w-full overflow-x-hidden bg-[#110a06]">
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <div className="pointer-events-none absolute left-1/2 top-20 z-30 h-[72px] w-[125vw] -translate-x-1/2 md:hidden">
            <CurvedLoop
              marqueeText="✦  cafe cool  ✦   since 2022  ✦   we pride at  ✦   what we serve"
              speed={2}
              curveAmount={-45}
              direction="right"
              interactive={false}
              className="fill-[#ffffff] text-[5.15rem] tracking-[0.12em]"
            />
          </div>
          <section id="home" className="relative h-screen overflow-hidden">
            <Carousel />
            <CurvyMarquee />
          </section>
          <MenuSection />
          <AboutSection />
          <Testimonials />
          <ContactSection />
        </>
      )}
    </main>
  );
}
