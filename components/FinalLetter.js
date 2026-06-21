"use client";

import { useAudio } from "@/components/AudioContext";
import { content } from "@/lib/content";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function FinalLetter() {
  const { fadeVolume } = useAudio();
  const sectionRef = useRef(null);
  
  // Trigger animations when the letter section is 30% visible in the viewport
  const inView = useInView(sectionRef, { amount: 0.3 });

  // Handle dynamic volume mapping: Dip to 0.25 when reading the letter, restore to 0.4 when leaving
  useEffect(() => {
    if (inView) {
      fadeVolume(0.25, 1500); // Slow dip to 0.25 volume
    } else {
      fadeVolume(0.4, 1500);  // Restore to standard 0.4 volume
    }
  }, [inView]);

  // Split letter body paragraphs
  const paragraphs = content.letter.body
    .split("\n\n")
    .filter((p) => p.trim() !== "");

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        staggerChildren: 0.4, // Slow, sequential fade in
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 px-6 sm:px-12 md:px-24 bg-[#0f172a] flex flex-col items-center justify-center min-h-screen select-none"
    >
      {/* Title */}
      <div className="text-center mb-16 pointer-events-none">
        <span className="text-xs uppercase tracking-[0.2em] font-sans-ui text-amber-400 font-semibold mb-2 block">
          Tribute
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
          A Letter to You
        </h2>
      </div>

      {/* Paper Card Wrapper */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-[680px] paper-texture rounded-[4px] p-8 sm:p-16 flex flex-col justify-between shadow-2xl relative border border-amber-900/10 cursor-default"
      >
        {/* Letter Header */}
        <motion.div variants={textVariants} className="mb-6">
          <h3 className="font-serif-letter italic text-2xl text-[#2d1f0e]">
            {content.letter.salutation}
          </h3>
        </motion.div>

        {/* Letter Body - ruled lines grid overlay */}
        <div className="ruled-lines font-serif-letter text-[#2d1f0e] text-base sm:text-lg tracking-wide font-normal mb-8 flex flex-col gap-6">
          {paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              variants={textVariants}
              className="text-justify leading-[1.9rem]"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Letter Closing & Sign-off */}
        <motion.div
          variants={textVariants}
          className="flex flex-col items-end text-right font-serif-letter text-[#2d1f0e] mt-4"
        >
          <span className="italic text-base sm:text-lg">{content.letter.closing}</span>
          <span className="font-semibold text-lg sm:text-xl mt-1">{content.letter.name}</span>
          <span className="font-sans-ui text-slate-500 text-xs tracking-wider uppercase mt-4">
            {content.letter.date}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
