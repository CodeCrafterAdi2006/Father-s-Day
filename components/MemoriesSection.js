"use client";

import { content, prefixPath } from "@/lib/content";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Image as ImageIcon } from "lucide-react";

function MemoryCard({ memory, index }) {
  const [imageError, setImageError] = useState(false);
  const isPlaceholder = false; // All 10 images are now provided and active

  // Animation variants for card entry
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // cubic-bezier ease out
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-xl border border-slate-800/80 group cursor-pointer"
    >
      {/* ── ACTUAL USER IMAGE ── */}
      {!isPlaceholder && !imageError ? (
        <div className="w-full h-full relative">
          <img
            src={prefixPath(memory.image)}
            alt={`Memory ${memory.id}`}
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle vignette shadow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      ) : (
        /* ── PLACEHOLDER IMAGE SLOT ── */
        <div className={`w-full h-full noise-bg flex flex-col items-center justify-center p-6 ${
          isPlaceholder 
            ? "bg-slate-900/40 border-2 border-dashed border-slate-700/50 hover:border-amber-400/40" 
            : "bg-slate-950/80"
        } transition-colors duration-300`}>
          {isPlaceholder ? (
            <div className="flex flex-col items-center gap-4 text-center">
              {/* Pulsing plus icon that rotates on hover */}
              <div className="w-12 h-12 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:border-amber-400/40 group-hover:bg-slate-850 transition-all duration-500">
                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </div>
              <span className="font-sans-ui text-xs font-semibold tracking-wider text-slate-500 group-hover:text-slate-400 uppercase select-none">
                Placeholder {memory.id - 5}
              </span>
              <span className="font-sans-ui text-[10px] text-slate-600 group-hover:text-slate-500 max-w-[120px] select-none">
                Ready for image upload
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <ImageIcon size={28} className="text-[#fbbf24]/30" />
              <span className="text-[#fbbf24]/40 font-display italic text-xs">
                Memory {memory.id}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Gold highlighting border frame */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#fbbf24]/30 rounded-xl pointer-events-none transition-colors duration-350" />
    </motion.div>
  );
}

export default function MemoriesSection() {
  // Container stagger properties for grid items
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative w-full py-24 md:py-32 px-6 sm:px-12 md:px-24 bg-[#0f172a] overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-20">
        
        {/* Section title header */}
        <div className="text-center md:text-left max-w-xl select-none">
          <span className="text-xs uppercase tracking-[0.2em] font-sans-ui text-amber-400 font-semibold mb-2 block">
            Memories
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Moments we shared
          </h2>
          <div className="w-12 h-[2px] bg-amber-400 mx-auto md:mx-0" />
        </div>

        {/* Gallery Grid - 3 cols on large screens, 2 cols on tablet, 1 on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {content.memories.map((memory, index) => (
            <MemoryCard key={memory.id} memory={memory} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
