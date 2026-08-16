"use client";
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import cafeCoolLogo from '@/assets/logo/only_image.png';
import pattern from '@/assets/svg_bg.png';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 4;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#110a06]"
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: `url(${pattern.src})`, backgroundRepeat: 'repeat', backgroundSize: '360px auto' }}
        animate={{ backgroundPositionX: ['0px', '-360px'] }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.div
          className="mb-8"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Image
            src={cafeCoolLogo}
            alt="Cafe Cool"
            priority
            className="h-auto w-40 md:w-52"
          />
        </motion.div>
        <div className="h-1 w-64 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-[#d96017]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
       </div>
    </motion.div>
  );
}
