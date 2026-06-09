import React, { useState, useEffect, useRef } from 'react';

interface AnimateCounterProps {
  value: number;
  duration?: number; // duration in ms
  start?: number; // starting number
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimateCounter({
  value,
  duration = 1500,
  start = 1,
  prefix = '',
  suffix = '',
  className = ''
}: AnimateCounterProps) {
  const [currentValue, setCurrentValue] = useState(start);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    // Basic fallback if intersection observer is not supported or element is server-rendered
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animatingRef.current) {
            animatingRef.current = true;
            let startTime: number | null = null;

            const step = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // easeOutExpo easing (super-slick luxury curve)
              const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const nextVal = Math.floor(easeProgress * (value - start) + start);

              setCurrentValue(nextVal);

              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                setCurrentValue(value);
              }
            };

            window.requestAnimationFrame(step);
          }
        } else {
          // When it goes out of view, reset so it can animate next time it is in view
          animatingRef.current = false;
          setCurrentValue(start);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, duration, start]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {currentValue.toLocaleString()}
      {suffix}
    </span>
  );
}
