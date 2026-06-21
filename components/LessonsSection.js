"use client";

import { content } from "@/lib/content";
import { motion } from "framer-motion";

export default function LessonsSection() {
  return (
    <section className="relative w-full py-24 px-6 bg-[#0f172a]">
      <div className="max-w-5xl mx-auto">
        {/* Section title container */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-sans-ui text-amber-400 font-semibold mb-2 block">
            Lessons
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Values you instilled
          </h2>
        </div>

        {/* Cards in grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.lessons.map((lesson, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[#1e293b]/90 backdrop-blur-md border-l-[3px] border-l-[#fbbf24] border-t border-r border-b border-[#334155] hover:border-[#fbbf24] rounded-r-lg p-6 shadow-xl flex flex-col justify-between h-full select-none cursor-default transition-all duration-300"
            >
              <span className="text-slate-500 font-sans-ui text-xs font-semibold block mb-4 self-end">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <p className="font-display italic text-lg sm:text-xl text-slate-100 leading-relaxed font-light">
                "{lesson}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
