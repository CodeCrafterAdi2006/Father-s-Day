"use client";

import { useAudio } from "@/components/AudioContext";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const { isPlaying, audioInitialized, togglePlayback } = useAudio();

  // Hide the music toggle if the user hasn't started the experience yet
  if (!audioInitialized) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={togglePlayback}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-3 px-4 py-3 bg-[#1e293b]/90 backdrop-blur-md border border-[#334155] hover:border-amber-400/50 rounded-full shadow-lg cursor-pointer transition-colors duration-300 group"
    >
      {/* Equalizer animation */}
      <div className="flex items-end gap-[3px] h-[16px] w-[20px] justify-center">
        <motion.div
          animate={isPlaying ? { height: [4, 16, 4] } : { height: 4 }}
          transition={isPlaying ? { repeat: Infinity, duration: 0.6, ease: "easeInOut" } : { duration: 0.2 }}
          className="w-[3px] bg-amber-400 rounded-full origin-bottom"
        />
        <motion.div
          animate={isPlaying ? { height: [4, 12, 4] } : { height: 4 }}
          transition={isPlaying ? { repeat: Infinity, duration: 0.7, delay: 0.15, ease: "easeInOut" } : { duration: 0.2 }}
          className="w-[3px] bg-amber-400 rounded-full origin-bottom"
        />
        <motion.div
          animate={isPlaying ? { height: [4, 18, 4] } : { height: 4 }}
          transition={isPlaying ? { repeat: Infinity, duration: 0.5, delay: 0.05, ease: "easeInOut" } : { duration: 0.2 }}
          className="w-[3px] bg-amber-400 rounded-full origin-bottom"
        />
        <motion.div
          animate={isPlaying ? { height: [4, 10, 4] } : { height: 4 }}
          transition={isPlaying ? { repeat: Infinity, duration: 0.8, delay: 0.25, ease: "easeInOut" } : { duration: 0.2 }}
          className="w-[3px] bg-amber-400 rounded-full origin-bottom"
        />
      </div>

      {/* Text/Icon State */}
      <span className="text-xs font-sans-ui font-medium tracking-wide text-slate-300 group-hover:text-amber-400 transition-colors duration-300 select-none">
        {isPlaying ? "MUSIC ON" : "MUSIC OFF"}
      </span>

      <div className="text-amber-400">
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </div>
    </motion.button>
  );
}
