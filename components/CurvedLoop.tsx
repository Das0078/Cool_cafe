"use client";

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import styles from './CurvedLoop.module.css';

type CurvedLoopProps = {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
};

export default function CurvedLoop({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
  interactive = true,
}: CurvedLoopProps) {
  const text = useMemo(() => {
    const hasTrailingWhitespace = /\s|\u00A0$/.test(marqueeText);
    const trimmedText = hasTrailingWhitespace ? marqueeText.replace(/\s+$/, '') : marqueeText;

    return `${trimmedText}\u00A0`;
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const directionRef = useRef(direction);
  const velocityRef = useRef(0);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid.replace(/:/g, '')}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;
  const totalText = spacing
    ? Array(Math.ceil(1800 / spacing) + 2).fill(text).join('')
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [text, className]);

  useEffect(() => {
    if (!spacing || !textPathRef.current) return;

    const initialOffset = -spacing;
    textPathRef.current.setAttribute('startOffset', `${initialOffset}px`);
    setOffset(initialOffset);
  }, [spacing]);

  useEffect(() => {
    if (!ready || !spacing) return;

    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = directionRef.current === 'right' ? speed : -speed;
        const currentOffset = Number.parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let nextOffset = currentOffset + delta;

        if (nextOffset <= -spacing) nextOffset += spacing;
        if (nextOffset > 0) nextOffset -= spacing;

        textPathRef.current.setAttribute('startOffset', `${nextOffset}px`);
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [ready, spacing, speed]);

  const updateOffset = (delta: number) => {
    if (!textPathRef.current || !spacing) return;

    const currentOffset = Number.parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let nextOffset = currentOffset + delta;

    if (nextOffset <= -spacing) nextOffset += spacing;
    if (nextOffset > 0) nextOffset -= spacing;

    textPathRef.current.setAttribute('startOffset', `${nextOffset}px`);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;

    dragRef.current = true;
    lastXRef.current = event.clientX;
    velocityRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragRef.current) return;

    const deltaX = event.clientX - lastXRef.current;
    lastXRef.current = event.clientX;
    velocityRef.current = deltaX;
    updateOffset(deltaX);
  };

  const endDrag = () => {
    if (!interactive || !dragRef.current) return;

    dragRef.current = false;
    directionRef.current = velocityRef.current > 0 ? 'right' : 'left';
  };

  return (
    <div
      className={styles.jacket}
      style={{ cursor: interactive ? 'grab' : 'auto', visibility: ready ? 'visible' : 'hidden' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className={styles.svg} viewBox="0 0 1440 120" aria-label={marqueeText}>
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {text}
        </text>
        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text fontWeight="bold" xmlSpace="preserve" className={className}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={`${offset}px`} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
}
