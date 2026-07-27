"use client";
import React from 'react';
import { motion } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  from?: { opacity?: number; scale?: number; y?: number; x?: number };
  to?: { opacity?: number; scale?: number; y?: number; x?: number };
  tag?: string;
}

export default function SplitText({
  text,
  className = '',
  delay = 40,
  duration = 0.5,
  from = { opacity: 0, scale: 0.8, y: 0 },
  to = { opacity: 1, scale: 1, y: 0 },
  tag = 'h1',
}: SplitTextProps) {
  const letters = text.split('');
  const Component = (tag || 'h1') as any;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const letterVariants = {
    hidden: { ...from },
    visible: {
      ...to,
      transition: {
        duration,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  return (
    <Component className={`inline-flex overflow-hidden ${className}`}>
      <motion.span
        className="inline-flex"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            variants={letterVariants}
            className="inline-block"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

