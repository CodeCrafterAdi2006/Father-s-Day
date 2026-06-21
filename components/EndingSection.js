"use client";

import { useAudio } from "@/components/AudioContext";
import { content } from "@/lib/content";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function EndingSection() {
  const { fadeVolume } = useAudio();
  const sectionRef = useRef(null);

  // Trigger animations when EndingSection is in view
  const inView = useInView(sectionRef, { amount: 0.2 });

  // ── MUSIC CONTROL ─────────────────────────────────────
  // Music volume rises to 0.5 when entering the Ending section
  useEffect(() => {
    if (inView) {
      fadeVolume(0.5, 2000); // Rise to 0.5 volume over 2 seconds
    } else {
      fadeVolume(0.4, 1500); // Restore default
    }
  }, [inView]);

  // ── STARRY BACKGROUND GENERATOR ───────────────────────
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const starCount = 90;
    const items = [];
    for (let i = 0; i < starCount; i++) {
      items.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1, // 1px to 3px
        delay: Math.random() * 2, // 0s - 2s entry fade delay
        twinkleDelay: Math.random() * 3, // random twinkle keyframe offset
        twinkleDuration: Math.random() * 2 + 2, // 2s - 4s twinkle speed
      });
    }
    setStars(items);
  }, []);

  // ── TEXT SEQUENCE STAGES ──────────────────────────────
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (!inView) return;

    const timers = [];
    // Timeline pauses specified in prompt
    timers.push(setTimeout(() => setStage(1), 200));   // "If I could choose my father again,"
    timers.push(setTimeout(() => setStage(2), 2200));  // "I'd choose you every time." (1.5s pause)
    timers.push(setTimeout(() => setStage(3), 4700));  // "Happy Father's Day ❤️" (2.0s pause)
    timers.push(setTimeout(() => setStage(4), 6200));  // Author name and Date (1.0s pause)
    timers.push(setTimeout(() => setStage(5), 7700));  // "One Last Message" button (1.0s pause)

    return () => timers.forEach(clearTimeout);
  }, [inView]);

  // ── ENVELOPE MODAL STATE ──────────────────────────────
  const [isOpen, setIsOpen] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const openEnvelope = () => {
    setIsOpen(true);
    fadeVolume(0.15, 1000); // Fade music volume to 0.15 for reading the secret
    // Trigger envelope 3D flap opening after a short entrance delay
    setTimeout(() => {
      setEnvelopeOpened(true);
    }, 600);
  };

  const closeEnvelope = () => {
    setEnvelopeOpened(false);
    setIsOpen(false);
    fadeVolume(0.5, 1000); // Restore Ending volume level (0.5)
  };

  const easeStandard = [0.16, 1, 0.3, 1];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-32 px-6 sm:px-12 md:px-24 bg-[#0f172a] overflow-hidden flex flex-col justify-center items-center select-none"
    >
      {/* Stars Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {stars.map((star, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0, 0.7, 0.4] } : {}}
            transition={{
              duration: 1,
              delay: star.delay,
              ease: "easeOut",
            }}
            className="absolute bg-white rounded-full star-twinkle"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.twinkleDelay}s`,
              animationDuration: `${star.twinkleDuration}s`,
            }}
          />
        ))}
      </div>

      {/* Main Quote & Signoff Sequence */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center max-w-4xl min-h-[300px]">
        {/* Quote line 1 */}
        {stage >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easeStandard }}
            className="font-display font-light text-2xl sm:text-4xl text-slate-300 mb-4"
          >
            "If I could choose my father again,"
          </motion.p>
        )}

        {/* Quote line 2 */}
        {stage >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easeStandard }}
            className="font-display font-bold text-3xl sm:text-5xl text-white mb-10"
          >
            "I'd choose you every time."
          </motion.p>
        )}

        {/* Main greeting header */}
        {stage >= 3 && (
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: easeStandard }}
            className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-amber-400 mb-6 drop-shadow-lg"
          >
            Happy Father's Day ❤️
          </motion.h2>
        )}

        {/* Author Sign-off details */}
        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: easeStandard }}
            className="flex flex-col items-center gap-1 mb-12"
          >
            <span className="font-sans-ui text-sm font-semibold tracking-wider text-slate-400">
              {content.letter.name}
            </span>
            <span className="font-sans-ui text-xs tracking-widest text-slate-500 uppercase">
              {content.letter.date}
            </span>
          </motion.div>
        )}

        {/* Open secret button */}
        {stage >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: easeStandard }}
          >
            <button
              onClick={openEnvelope}
              className="relative py-2 px-1 text-sm font-sans-ui font-semibold tracking-wider text-[#fbbf24] bg-transparent border-b border-[#fbbf24]/30 hover:border-[#fbbf24] transition-colors duration-300 outline-none cursor-pointer"
            >
              ONE LAST MESSAGE
            </button>
          </motion.div>
        )}
      </div>

      {/* ── ENVELOPE MODAL (PORTAL SIMULATED WITH FULLSCREEN COVER) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeStandard }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-6"
          >
            {/* Close handler clicking background */}
            <div className="absolute inset-0 z-0" onClick={closeEnvelope} />

            {/* Floating Close Button */}
            <button
              onClick={closeEnvelope}
              aria-label="Close message"
              className="absolute top-6 right-6 z-20 p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-full cursor-pointer hover:border-amber-400/50 transition-colors duration-300"
            >
              <X size={20} />
            </button>

            {/* Envelope 3D structure container */}
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              transition={{ duration: 0.6, ease: easeStandard }}
              className="relative w-[340px] h-[220px] bg-[#1e293b] rounded-b-lg border-b border-l border-r border-slate-700/80 shadow-2xl perspective-1000 preserve-3d z-10 select-none mt-12"
            >
              {/* Inside background backing wall */}
              <div className="absolute inset-0 bg-[#0f172a] rounded-b-lg border border-slate-800 z-0 shadow-inner" />

              {/* ── 3D FLAP FOLDING ── */}
              <div
                className="absolute top-0 left-0 w-full h-[110px] origin-top z-30 preserve-3d transition-transform duration-[700ms] ease-in-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: envelopeOpened ? "rotateX(180deg) translateY(1px)" : "rotateX(0deg)",
                }}
              >
                {/* Front side of flap (shows when closed) - backface hidden */}
                <div className="absolute inset-0 backface-hidden w-full h-full z-10">
                  <svg viewBox="0 0 340 110" className="w-full h-full fill-[#1e293b] stroke-slate-700/80 stroke-2">
                    <polygon points="0,0 340,0 170,110" />
                  </svg>
                </div>

                {/* Back side of flap (shows when opened, flipped up) - backface hidden & rotated */}
                <div className="absolute inset-0 backface-hidden w-full h-full z-0 transform rotateX(180deg)">
                  <svg viewBox="0 0 340 110" className="w-full h-full fill-[#192333] stroke-slate-700/80 stroke-[1.5]">
                    <polygon points="0,0 340,0 170,110" />
                  </svg>
                </div>
              </div>

              {/* ── STICKY PAPER CARD SLIDES UPWARD ── */}
              <div
                className="absolute left-4 right-4 h-[180px] bg-[#fdf6e3] paper-texture rounded p-6 shadow-2xl z-10 transition-transform duration-[850ms] ease-out flex flex-col justify-center items-center text-center cursor-default select-text"
                style={{
                  transform: envelopeOpened ? "translateY(-130px)" : "translateY(0px)",
                }}
              >
                <div className="absolute inset-0 border border-amber-900/5 m-1 rounded pointer-events-none" />
                <p className="font-serif-letter italic text-[#2d1f0e] text-base leading-relaxed max-w-[280px]">
                  "{content.hiddenMessage}"
                </p>
              </div>

              {/* ── ENVELOPE BODY FRONT OVERLAYS (draws over the paper inside pocket) ── */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <svg viewBox="0 0 340 220" className="w-full h-full filter drop-shadow-[0_-5px_15px_rgba(0,0,0,0.35)]">
                  {/* Left fold flap */}
                  <path d="M 0,0 L 155,110 L 0,220 Z" fill="#1d2838" stroke="#334155" strokeWidth="1.5" />
                  {/* Right fold flap */}
                  <path d="M 340,0 L 185,110 L 340,220 Z" fill="#1d2838" stroke="#334155" strokeWidth="1.5" />
                  {/* Bottom fold flap */}
                  <path d="M 0,220 L 170,105 L 340,220 Z" fill="#243347" stroke="#334155" strokeWidth="1.5" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
