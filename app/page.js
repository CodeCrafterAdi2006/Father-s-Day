"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import MemoriesSection from "@/components/MemoriesSection";
import LessonsSection from "@/components/LessonsSection";
import NeverSaidSection from "@/components/NeverSaidSection";
import NumbersSection from "@/components/NumbersSection";
import FinalLetter from "@/components/FinalLetter";
import EndingSection from "@/components/EndingSection";
import MusicToggle from "@/components/MusicToggle";

export default function Home() {
  const [journeyStarted, setJourneyStarted] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-100 overflow-x-hidden">
      {/* 1. Pre-entry Loading Screen */}
      <AnimatePresence>
        {!journeyStarted && (
          <LoadingScreen onComplete={() => setJourneyStarted(true)} />
        )}
      </AnimatePresence>

      {/* 2. Main Tribute Experience (mounted after Begin is clicked) */}
      {journeyStarted && (
        <>
          <HeroSection />
          <MemoriesSection />
          <LessonsSection />
          <NeverSaidSection />
          <NumbersSection />
          <FinalLetter />
          <EndingSection />
          
          {/* Floating Audio Playback Controller */}
          <MusicToggle />
        </>
      )}
    </main>
  );
}
