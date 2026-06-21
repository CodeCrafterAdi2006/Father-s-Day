"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(0.4);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  // Initialize and play the audio inside a user-gesture callback (e.g., Click)
  const initializeAudio = () => {
    if (audioRef.current) return;

    const audio = new Audio("/audio/Papa Mere Papa (PenduJatt.Com.Se).mp3");
    audio.loop = true;
    audio.volume = 0; // Start completely silent, fade it in
    audio.currentTime = 15; // Start at 0:15
    audioRef.current = audio;

    // Trigger play immediately in the same callstack to satisfy browser requirements
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setAudioInitialized(true);
        fadeVolume(0.4, 3000); // Fade from 0.0 to 0.4 over 3s
      })
      .catch((err) => {
        console.warn("Audio autoplay blocked or failed:", err);
        // Fallback: mark as initialized so we render controls, but leave isPlaying false
        setAudioInitialized(true);
      });
  };

  const playAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        fadeVolume(currentVolume, 1000); // Transition up smoothly
      })
      .catch((err) => console.error("Play failed:", err));
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    // Fade down volume before pausing to feel premium, then pause
    fadeVolume(0, 400);
    setTimeout(() => {
      if (audioRef.current && audioRef.current.volume === 0) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }, 400);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Smooth volume fades
  const fadeVolume = (targetVolume, durationMs = 1000) => {
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const startVolume = audioRef.current.volume;
    const stepTime = 50; // Update volume every 50ms
    const steps = durationMs / stepTime;
    const volumeStep = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        clearInterval(fadeIntervalRef.current);
        return;
      }

      let newVolume = audioRef.current.volume + volumeStep;

      // Handle boundaries and precision
      if (volumeStep > 0) {
        if (newVolume >= targetVolume) {
          newVolume = targetVolume;
          clearInterval(fadeIntervalRef.current);
        }
      } else {
        if (newVolume <= targetVolume) {
          newVolume = targetVolume;
          clearInterval(fadeIntervalRef.current);
        }
      }

      newVolume = Math.max(0, Math.min(1, newVolume));
      audioRef.current.volume = newVolume;
      setCurrentVolume(newVolume);

      currentStep++;
      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current);
      }
    }, stepTime);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{
      isPlaying,
      audioInitialized,
      currentVolume,
      initializeAudio,
      playAudio,
      pauseAudio,
      togglePlayback,
      fadeVolume
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
