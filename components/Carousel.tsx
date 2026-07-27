"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SplitText from './SplitText';

const slides = [
  {
    id: 1,
    bgColor: "var(--color-slide-1)",
    title: "COFFEE",
    mainImg: "/assets/Coffee_png.png",
    floatingImgs: ["/assets/Floating_coffee_beans.png", "/assets/Floating_coffee_beans.png", "/assets/Floating_coffee_beans.png"],
    imageClass: "w-[60vw] md:w-[35vw] max-w-[500px]"
  },
  {
    id: 2,
    bgColor: "var(--color-slide-2)",
    title: "BURGER",
    mainImg: "/assets/Burger_png.png",
    floatingImgs: ["/assets/Floating_french_fries.png", "/assets/Floating_french_fries.png", "/assets/Floating_french_fries.png"],
    imageClass: "mt-25 w-[85vw] md:w-[55vw] max-w-[800px]"
  },
  {
    id: 3,
    bgColor: "var(--color-slide-3)",
    title: "MOMO",
    mainImg: "/assets/Momo_png.png",
    floatingImgs: ["/assets/Floating_momo.png", "/assets/Floating_momo.png", "/assets/Floating_momo.png"],
    imageClass: "mt-25 w-[90vw] md:w-[60vw] max-w-[800px]"
  }
];

export default function Carousel() {
  const [{ current: currentIndex, prev: prevIndex }, setIndices] = useState({ current: 0, prev: 0 });

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
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Transition */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backgroundColor: slides[currentIndex].bgColor }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
          style={{ backgroundColor: slides[currentIndex].bgColor } as React.CSSProperties}
        />
      </AnimatePresence>

      {/* Big Stretch Text */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
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
              className="text-[12vh] md:text-[16vh] leading-none font-black text-white select-none text-stretch whitespace-nowrap"
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
                  animate={{
                    x: isActive ? '0%' : isLeft ? '-80%' : '80%',
                    scale: isActive ? 1 : 0.4,
                    opacity: isActive ? 1 : 0.6,
                  }}
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
                  {isActive && slide.floatingImgs.map((imgSrc, i) => {
                    const xPositions = ['-25vw', '25vw', '15vw'];
                    const yPositions = ['-15vh', '-20vh', '25vh'];
                    return (
                      <motion.img
                        key={i}
                        src={imgSrc}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: 0.9, 
                          scale: 1,
                          x: xPositions[i],
                          y: yPositions[i],
                          rotate: [0, 360]
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ 
                          opacity: { duration: 0.5 },
                          scale: { duration: 0.5, type: 'spring' },
                          rotate: { duration: 25 + i * 5, repeat: Infinity, ease: 'linear' },
                        }}
                        className="absolute z-20 w-20 h-20 md:w-28 md:h-28 object-contain blur-[1px]"
                      />
                    )
                  })}
                </AnimatePresence>
             </div>
          )
        })}
      </div>
    </div>
  )
}
