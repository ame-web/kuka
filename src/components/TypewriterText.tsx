import React from "react";
import { motion } from "motion/react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function TypewriterText({ text, className = "", delay = 0, once = false }: TypewriterTextProps) {
  // Split character-by-character to create a typing sequence
  const characters = text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.02, // Fast, modern premium pace
      },
    },
  };

  const characterVariants = {
    hidden: { 
      opacity: 0, 
      y: 4,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Slick luxury curve
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      className={`inline-block whitespace-pre-wrap ${className}`}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={characterVariants}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface TypewriterParagraphProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function TypewriterParagraph({ text, className = "", delay = 0, once = false }: TypewriterParagraphProps) {
  // Split word-by-word for longer descriptions to look cohesive and upscale
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.04, // Smooth staggered word appearance
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      className={`inline-block whitespace-pre-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
