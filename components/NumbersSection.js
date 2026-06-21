"use client";

import { content } from "@/lib/content";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function StatCard({ stat, index }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });
  
  const [displayValue, setDisplayValue] = useState("0");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const valueStr = stat.value;
    const isInfinity = valueStr === "∞";
    const isPercentage = valueStr.endsWith("%");
    
    if (isInfinity) {
      // Infinity doesn't count up, just triggers complete and pulses
      setTimeout(() => {
        setDisplayValue("∞");
        setIsComplete(true);
      }, 300);
      return;
    }

    // Extract target number to count up to
    const targetNum = parseInt(valueStr.replace(/[^0-9]/g, ""), 10) || 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: ease out cubic
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOutCubic * targetNum);
      
      // Re-apply formatting (commas and percentage suffix)
      const formatted = current.toLocaleString() + (isPercentage ? "%" : "");
      setDisplayValue(formatted);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(valueStr);
        setIsComplete(true);
      }
    };

    requestAnimationFrame(animateCount);
  }, [inView, stat.value]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const isInfinity = stat.value === "∞";

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
      className="bg-[#1e293b]/70 backdrop-blur-sm border border-slate-800 rounded-xl p-8 relative flex flex-col justify-between overflow-hidden group select-none transition-all duration-300"
    >
      {/* Decorative hover gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Stat Value */}
        <div className="relative inline-block mb-3">
          <motion.span
            animate={isInfinity && inView ? { scale: [0.8, 1.05, 1], opacity: [0, 1] } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-5xl sm:text-6xl font-bold text-amber-400 block tracking-tight"
          >
            {displayValue}
          </motion.span>

          {/* Underline drawn at completion */}
          <div className="absolute -bottom-1 left-0 h-[2px] bg-amber-400 w-full origin-left transition-transform duration-700 ease-out"
               style={{ transform: isComplete ? "scaleX(1)" : "scaleX(0)" }} />
        </div>

        {/* Stat Labels */}
        <h3 className="font-sans-ui text-base sm:text-lg font-medium text-slate-100 tracking-wide mt-2">
          {stat.label}
        </h3>
      </div>

      <span className="font-sans-ui text-xs text-slate-400 mt-4 tracking-wider uppercase block">
        {stat.sublabel}
      </span>
    </motion.div>
  );
}

export default function NumbersSection() {
  // CSS grid overlay styling
  const gridOverlayStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
  };

  return (
    <section className="relative w-full py-24 md:py-32 px-6 sm:px-12 md:px-24 bg-[#1e293b] overflow-hidden">
      {/* Grid Pattern overlay for depth */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0" style={gridOverlayStyle} />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.2em] font-sans-ui text-amber-400 font-semibold mb-2 block">
            Stats
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Dad in Numbers
          </h2>
          <div className="w-12 h-[2px] bg-amber-400 mx-auto" />
        </div>

        {/* Numbers grid - 2x2 on desktop, 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.numbers.map((stat, idx) => (
            <StatCard key={idx} stat={stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
