"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SplitText from './SplitText';
import CurvedLoop from './CurvedLoop';
import slide1Background from '@/assets/backgrounds/SLIDE1.png';
import slide2Background from '@/assets/backgrounds/SLIDE2.png';
import slide3Background from '@/assets/backgrounds/SLIDE3.png';

const slides = [
  {
    id: 1,
    background: slide1Background,
    title: "COFFEE",
    mainImg: "/assets/Coffee_png.png",
    floatingImg: "/assets/Floating_coffee_beans.png",
    imageClass: "w-[60vw] md:w-[35vw] max-w-[500px]"
  },
  {
    id: 2,
    background: slide2Background,
    title: "BURGER",
    mainImg: "/assets/Burger_png.png",
    floatingImg: "/assets/Floating_french_fries.png",
    imageClass: "mt-25 w-[85vw] md:w-[55vw] max-w-[800px]"
  },
  {
    id: 3,
    background: slide3Background,
    title: "MOMO",
    mainImg: "/assets/Momo_png.png",
    floatingImg: "/assets/Floating_momo.png",
    imageClass: "mt-25 w-[90vw] md:w-[60vw] max-w-[800px]"
  }
];

export default function Carousel() {
  const [{ current: currentIndex, prev: prevIndex }, setIndices] = useState({ current: 0, prev: 0 });
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateScreenSize = () => setIsSmallScreen(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener('change', updateScreenSize);
    return () => mediaQuery.removeEventListener('change', updateScreenSize);
  }, []);

  useEffect(() => {
    // Start fetching every background immediately, rather than when its slide
    // first becomes active, to prevent a transition from waiting on an image.
    slides.forEach(({ background }) => {
      const image = new window.Image();
      image.src = background.src;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndices((prev) => ({
        prev: prev.current,
        current: (prev.current + 1) % slides.length
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full  h-screen overflow-hidden flex items-center justify-center">
      {/* Background Transition */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${slides[currentIndex].background.src})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            backgroundSize: '70% auto',
            transform: 'translateZ(0)',
            willChange: 'opacity',
          }}
        />
      </AnimatePresence>

      {/* Big Stretch Text */}
      <div className="absolute inset-0 z-0 flex -translate-y-[8vh] items-center justify-center overflow-hidden pointer-events-none md:translate-y-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-center w-full"
          >
            <SplitText
              text={slides[currentIndex].title}
              className="text-[10vh] md:text-[16vh] leading-none font-oswald font-black text-white select-none text-stretch whitespace-nowrap"
              tag="h1"
              delay={40}
              duration={0.5}
              from={{ opacity: 0, scale: 0.8, y: 0 }}
              to={{ opacity: 1, scale: 1, y: 0 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center perspective-[1000px]">
        {slides.map((slide, index) => {
          let offset = index - currentIndex;
          if (offset < -1) offset += slides.length;
          if (offset > 1) offset -= slides.length;

          let prevOffset = index - prevIndex;
          if (prevOffset < -1) prevOffset += slides.length;
          if (prevOffset > 1) prevOffset -= slides.length;

          const isActive = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;

          const isWrapping = Math.abs(prevOffset - offset) > 1;

          // A product returning from the left slot is repositioned on the right
          // so it never travels across the active product during the wrap.
          const visualState = isActive
            ? { x: '0vw', y: isSmallScreen ? '-8vh' : '0vh', scale: isSmallScreen ? 1.1 : 1, opacity: 1 }
            : isLeft
              ? { x: '-31vw', y: isSmallScreen ? '30vh' : '25vh', scale: 0.34, opacity: 0.9 }
              : { x: '31vw', y: isSmallScreen ? '30vh' : '25vh', scale: 0.34, opacity: 0.9 };

          if (!isActive && !isLeft && !isRight) return null;

          return (
             <div
               key={slide.id}
               className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
               style={{ zIndex: isActive ? 20 : 10 }}
             >
                {/* Main Product Image Wrapper */}
                <motion.div
                  initial={false}
                  animate={visualState}
                  transition={{ duration: isWrapping ? 0 : 0.8, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute flex items-center justify-center w-full h-full"
                >
                  <motion.img 
                    src={slide.mainImg}
                    alt={slide.title}
                    className={`relative z-10 object-contain drop-shadow-2xl pointer-events-auto ${slide.imageClass}`}
                    animate={{
                       y: isActive ? [0, -20, 0] : 0,
                    }}
                    transition={{
                       duration: 4,
                       repeat: Infinity,
                       ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Floating Elements */}
                <AnimatePresence>
                  {isActive && (
                    <motion.img
                      src={slide.floatingImg}
                      alt=""
                      aria-hidden="true"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 0.9, scale: isSmallScreen ? (slide.id === 1 ? [1.65, 1.75, 1.65] : [1.28, 1.38, 1.28]) : [1, 1.08, 1] }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{
                        opacity: { duration: 0.5 },
                        scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                      }}
                      className={`absolute z-20 -translate-y-[8vh] object-contain pointer-events-none md:translate-y-0 ${slide.imageClass}`}
                    />
                  )}
                </AnimatePresence>
             </div>
          )
        })}
      </div>
    </div>
  )
}
