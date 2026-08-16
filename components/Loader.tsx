"use client";
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import cafeCoolLogo from '@/assets/logo/only_image.png';

const bubbles = [
  { size: 40, left: '10%', duration: 8, delay: 0 },
  { size: 20, left: '20%', duration: 5, delay: 1 },
  { size: 50, left: '35%', duration: 7, delay: 2 },
  { size: 80, left: '50%', duration: 11, delay: 0 },
  { size: 35, left: '55%', duration: 6, delay: 1 },
  { size: 45, left: '65%', duration: 8, delay: 3 },
  { size: 90, left: '70%', duration: 12, delay: 2 },
  { size: 25, left: '80%', duration: 6, delay: 2 },
  { size: 15, left: '70%', duration: 5, delay: 1 },
  { size: 90, left: '25%', duration: 10, delay: 4 },
];

export default function Loader({ onComplete, images }: { onComplete: () => void; images: string[] }) {
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(images.length === 0);

  useEffect(() => {
    let loaded = 0;
    let settled = false;
    const markLoaded = () => {
      loaded += 1;
      if (!settled && loaded >= images.length) {
        settled = true;
        setImagesLoaded(true);
      }
    };

    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    images.forEach((src) => {
      const img = new window.Image();
      img.onload = markLoaded;
      img.onerror = markLoaded;
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (imagesLoaded) return Math.min(100, p + 4);
        return Math.min(95, p + 2);
      });
    }, 40);
    return () => clearInterval(timer);
  }, [imagesLoaded]);

  useEffect(() => {
    if (progress >= 100 && imagesLoaded) {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, imagesLoaded, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#110a06]"
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="bubbles" aria-hidden="true">
        {bubbles.map((bubble, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
            }}
          />
        ))}
      </div>

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
