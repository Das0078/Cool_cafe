"use client";
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import cafeCoolLogo from '@/assets/logo/only_image.png';

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
      className="fixed inset-0 z-[100] bg-[#110a06] flex flex-col items-center justify-center"
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
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
       <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
         <motion.div 
           className="h-full bg-[#d96017]"
           initial={{ width: 0 }}
           animate={{ width: `${progress}%` }}
           transition={{ ease: "linear" }}
         />
       </div>
    </motion.div>
  );
}
