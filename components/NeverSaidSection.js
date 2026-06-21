"use client";

import { content } from "@/lib/content";
import { motion } from "framer-motion";

export default function NeverSaidSection() {
  return (
    <section className="relative w-full py-24 px-6 bg-[#0f172a]">
      <div className="max-w-4xl mx-auto">
        {/* Title overlay */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-sans-ui text-amber-400 font-semibold mb-2 block">
            The Things
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            I Never Said Properly
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {content.neverSaid.map((sentence, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="font-display font-light text-2xl sm:text-4xl md:text-5xl text-center leading-relaxed text-[#f8fafc] max-w-3xl mx-auto select-none">
                {sentence}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
