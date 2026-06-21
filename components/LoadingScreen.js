"use client";

import { useAudio } from "@/components/AudioContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const { initializeAudio } = useAudio();
  const [isExiting, setIsExiting] = useState(false);

  const handleBegin = () => {
    // 1. Initialize audio immediately inside user gesture to bypass browser security blocks
    initializeAudio();

    // 2. Set exit animation state
    setIsExiting(true);

    // 3. Complete loading transition after fade out (0.4s)
    setTimeout(() => {
      onComplete();
    }, 450); // Matches fade out duration
  };

  // Easing standard: cubic-bezier(0.16, 1, 0.3, 1)
  const easeStandard = [0.16, 1, 0.3, 1];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="loader"
          initial={{ backgroundColor: "#000000" }}
          animate={{ backgroundColor: "#0f172a" }}
          exit={{ opacity: 0, backgroundColor: "#000000" }}
          transition={{ duration: 0.4, ease: easeStandard }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center p-6 select-none"
        >
          {/* Main Title text */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: easeStandard }}
            className="text-slate-300 font-display italic text-lg sm:text-2xl font-light tracking-wide max-w-lg mb-10"
          >
            For the person who gave me everything...
          </motion.p>

          {/* Begin button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1.2, ease: easeStandard }}
          >
            <button
              onClick={handleBegin}
              className="relative px-8 py-3 rounded-full text-[#fbbf24] font-sans-ui text-sm sm:text-base font-semibold tracking-wider hover:text-white bg-slate-900 border-2 border-amber-400/40 hover:border-amber-400 transition-colors duration-300 outline-none cursor-pointer group"
            >
              {/* Soft gold pulsing border */}
              <span className="absolute inset-0 -m-[2px] rounded-full border-2 border-[#fbbf24] opacity-70 group-hover:opacity-100 animate-ping [animation-duration:2s]" />
              
              BEGIN THE JOURNEY
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
