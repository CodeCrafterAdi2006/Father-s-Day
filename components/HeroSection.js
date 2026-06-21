"use client";

import { content } from "@/lib/content";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax: image moves at 0.4x scroll speed
  const yParallax = useTransform(scrollY, [0, 800], [0, 320]);

  // Scroll indicator opacity: fades out when scrolling past 100px
  const indicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Typewriter state
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fullTitle = "Dear Dad,";

  useEffect(() => {
    let charIndex = 0;
    const typeTimer = setInterval(() => {
      if (charIndex < fullTitle.length) {
        setTypedText(fullTitle.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeTimer);
        // Blinks cursor 3 times (on and off = 6 times) then fades out cursor and fades in subtitle
        let blinkCount = 0;
        const blinkInterval = setInterval(() => {
          setCursorVisible((v) => !v);
          blinkCount++;
          if (blinkCount >= 6) {
            clearInterval(blinkInterval);
            setCursorVisible(false);
            setShowSubtitle(true);
          }
        }, 400);
      }
    }, 80);

    return () => clearInterval(typeTimer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center px-6 sm:px-12 md:px-24 select-none"
    >
      {/* Background Container - parallax scrolling */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
      >
        {!imageError ? (
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src={content.heroImage}
            alt={content.heroAlt}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
            priority="true"
          />
        ) : (
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full noise-bg bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
          />
        )}
        
        {/* Shadow overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-black/40" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mt-12">
        <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-6">
          {typedText}
          {cursorVisible && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-amber-400 font-light ml-1"
            >
              |
            </motion.span>
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-400 font-sans-ui font-light text-lg sm:text-xl md:text-2xl tracking-wide max-w-xl"
        >
          There are many things I've never said properly.
        </motion.p>
      </div>

      {/* Bouncing Scroll Down Indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
      >
        <span className="text-slate-400 font-sans-ui text-xs tracking-widest font-medium uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-[40px] bg-slate-500 overflow-hidden relative">
          <motion.div
            animate={{
              y: [-40, 40],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-full h-[20px] bg-gradient-to-b from-[#fbbf24] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
