"use client";

import { content } from "@/lib/content";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function NeverSaidSection() {
  const containerRef = useRef(null);
  const N = content.neverSaid.length;

  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spacing between lines
  const spacing = 180;

  // Calculate the vertical scroll list translation directly from scrollYProgress to keep it simple and robust
  const listY = useTransform(scrollYProgress, [0, 1], [0, -(N - 1) * spacing]);

  return (
    <section
      ref={containerRef}
      style={{ height: `calc(80vh * ${N})` }}
      className="relative w-full bg-[#0f172a]"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center px-6">
        
        {/* Title overlay */}
        <div className="absolute top-12 text-center pointer-events-none">
          <span className="text-xs uppercase tracking-[0.2em] font-sans-ui text-amber-400 font-semibold mb-2 block">
            The Things
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white/50">
            I Never Said Properly
          </h2>
        </div>

        {/* Central sliding viewport */}
        <div className="relative w-full max-w-4xl h-[300px] flex items-center justify-center overflow-hidden">
          {/* Center marker highlight */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[120px] border-t border-b border-amber-400/5 pointer-events-none" />

          {/* List container that slides vertically */}
          <motion.div
            style={{ y: listY }}
            className="flex flex-col items-center justify-center gap-0"
          >
            {content.neverSaid.map((sentence, index) => {
              // Peak scroll progress for this specific sentence
              const p_i = index / (N - 1 || 1);
              const step = 1 / (N - 1 || 1);

              const rawStart = p_i - step * 0.8;
              const rawPeak = p_i;
              const rawEnd = p_i + step * 0.8;

              // Opacity Range mapping
              const opacityRange = [
                Math.max(0, rawStart),
                rawPeak,
                Math.min(1, rawEnd)
              ];

              // Ensure strict monotonic increase (no duplicate values) to avoid NaN division-by-zero crashes
              if (opacityRange[0] === opacityRange[1]) {
                opacityRange[0] = -0.001;
              }
              if (opacityRange[1] === opacityRange[2]) {
                opacityRange[2] = 1.001;
              }

              // Translation Range mapping
              const yRange = [
                Math.max(0, rawStart),
                rawPeak
              ];
              if (yRange[0] === yRange[1]) {
                yRange[0] = -0.001;
              }

              // Transform bindings
              const opacity = useTransform(scrollYProgress, opacityRange, [0, 1, 0.3]);
              const yTranslate = useTransform(scrollYProgress, yRange, [16, 0]);

              return (
                <motion.div
                  key={index}
                  style={{
                    opacity,
                    y: yTranslate,
                    height: `${spacing}px`,
                  }}
                  className="flex items-center justify-center w-full px-4"
                >
                  <p className="font-display font-light text-2xl sm:text-4xl md:text-5xl text-center leading-relaxed text-[#f8fafc] max-w-3xl select-none">
                    {sentence}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
