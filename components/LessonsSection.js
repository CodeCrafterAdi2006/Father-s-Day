"use client";

import { content } from "@/lib/content";
import { motion, useScroll, useTransform, useMotionValueEvent, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function LessonsSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const codeBoxRef = useRef(null);
  const codeInView = useInView(codeBoxRef, { once: true, amount: 0.2 });

  // Map scroll progress of the 200vh container to control transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Code block exits: fades out and scales down slightly between 25% and 45% scroll progress
  const codeOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 1, 0]);
  const codeScale = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 1, 0.95]);

  // Handle switching state between Code View (Phase 1/2) and Cards View (Phase 3)
  const [showCards, setShowCards] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.45) {
      setShowCards(true);
    } else {
      setShowCards(false);
    }
  });

  // ── PARTICLES BACKGROUND ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = [];
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? "#fbbf24" : "#334155",
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      // Low opacity background texture
      ctx.globalAlpha = 0.15;
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ── CODE TYPEWRITER EFFECT ────────────────────────────
  const codeLines = [
    "const lessonsDadTaughtMe = [",
    ...content.lessons.map((lesson) => `  "${lesson}",`),
    "];",
  ];

  const [typedLines, setTypedLines] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentLineText, setCurrentLineText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (!codeInView) return;

    if (currentLineIdx < codeLines.length) {
      let charIdx = 0;
      const targetText = codeLines[currentLineIdx];

      const typeTimer = setInterval(() => {
        if (charIdx < targetText.length) {
          setCurrentLineText(targetText.slice(0, charIdx + 1));
          charIdx++;
        } else {
          clearInterval(typeTimer);
          setTypedLines((prev) => [...prev, targetText]);
          setCurrentLineText("");
          setCurrentLineIdx((prev) => prev + 1);
        }
      }, 40); // 40ms typing speed

      return () => clearInterval(typeTimer);
    } else {
      setTypingComplete(true);
    }
  }, [codeInView, currentLineIdx]);

  // Card staggered motion animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-[#0f172a]">
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center px-6 sm:px-12 md:px-24">
        {/* Particle Canvas Layer */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        {/* Section title container */}
        <div className="absolute top-12 z-10 text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-sans-ui text-amber-400 font-semibold mb-2 block">
            Lessons
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Values you instilled
          </h2>
        </div>

        {/* ── PHASE 1 & 2: CODE BLOCK ────────────────────── */}
        <motion.div
          ref={codeBoxRef}
          style={{
            opacity: codeOpacity,
            scale: codeScale,
            display: showCards ? "none" : "block",
          }}
          className="relative z-10 w-full max-w-2xl px-6 py-6 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-lg shadow-2xl font-code text-xs sm:text-sm text-slate-300 select-none overflow-hidden"
        >
          {/* Editor Header Bar */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-slate-500 text-xs font-mono ml-4">lessons.js</span>
          </div>

          {/* Render lines */}
          <div className="space-y-1">
            {typedLines.map((line, idx) => (
              <div key={idx} className="whitespace-pre">
                <span className="text-slate-600 select-none mr-4 inline-block w-4 text-right">
                  {idx + 1}
                </span>
                <span className={idx === 0 || idx === codeLines.length - 1 ? "text-amber-400" : "text-slate-300"}>
                  {line}
                </span>
              </div>
            ))}

            {/* Currently typing line */}
            {currentLineIdx < codeLines.length && (
              <div className="whitespace-pre">
                <span className="text-slate-600 select-none mr-4 inline-block w-4 text-right">
                  {currentLineIdx + 1}
                </span>
                <span className={currentLineIdx === 0 ? "text-amber-400" : "text-slate-300"}>
                  {currentLineText}
                </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="bg-amber-400 text-transparent ml-[2px] px-[1px] select-none"
                >
                  |
                </motion.span>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── PHASE 3: DYNAMIC CARDS ─────────────────────── */}
        <AnimatePresence>
          {showCards && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch"
            >
              {content.lessons.map((lesson, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{ y: -4, borderColor: "#fbbf24" }}
                  className="bg-[#1e293b]/90 backdrop-blur-md border-l-[3px] border-l-[#fbbf24] border-t border-r border-b border-[#334155] rounded-r-lg p-6 shadow-xl flex flex-col justify-between h-full select-none cursor-default transition-colors duration-300"
                >
                  <span className="text-slate-500 font-sans-ui text-xs font-semibold block mb-4 self-end">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display italic text-lg sm:text-xl text-slate-100 leading-relaxed font-light mt-auto">
                    "{lesson}"
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
