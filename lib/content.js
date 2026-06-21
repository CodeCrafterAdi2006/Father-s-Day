const BASE_PATH = ""; // Set to "" for Vercel / Root Domain deployment

export const prefixPath = (path) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
};

export const content = {
  // ── HERO ──────────────────────────────────────────────
  heroImage: "/images/memory-6.jpg",
  heroAlt: "Dad",

  // ── MEMORIES ──────────────────────────────────────────
  memories: [
    { id: 1, image: "/images/memory-1.jpg" },
    { id: 2, image: "/images/memory-2.png" },
    { id: 3, image: "/images/memory-3.png" },
    { id: 4, image: "/images/memory-4.png" },
    { id: 5, image: "/images/memory-5.jpg" },
    { id: 6, image: "/images/memory-6.jpg" },
    { id: 7, image: "/images/memory-7.jpg" },
    { id: 8, image: "/images/memory-8.png" },
    { id: 9, image: "/images/memory-9.png" },
    { id: 10, image: "/images/memory-10.png" }
  ],

  // ── LESSONS ───────────────────────────────────────────
  lessons: [
    "Work hard, even when no one is watching.",
    "Stay true to yourself, always be happy.",
    "Respect people — all people.",
    "Keep learning. Never think you're done.",
    "Never quit on the things that matter."
  ],

  // ── THINGS I NEVER SAID ───────────────────────────────
  neverSaid: [
    "Thank you for every sacrifice I never noticed.",
    "Thank you for being there always even when I thought you weren't",
    "Thank you for believing in me before I ever believed in myself.",
    "Thank you for showing up. Every single time. Even when you were tired.",
    "Thank you for being the anchor that kept me grounded, no matter how strong the storm."
  ],

  // ── NUMBERS ───────────────────────────────────────────
  numbers: [
    {
      value: "3420",          // Will count up automatically
      label: "Dad Jokes Told",
      sublabel: "and counting"
    },
    {
      value: "∞",             // Will pulse/fade in
      label: "Problems Solved",
      sublabel: "at any hour"
    },
    {
      value: "100%",          // Will reveal percentage
      label: "Ginger Tea Made at 6am",
      sublabel: "without fail"
    },
    {
      value: "∞",
      label: "Love Given",
      sublabel: "unconditionally"
    }
  ],

  // ── FINAL LETTER ──────────────────────────────────────
  letter: {
    salutation: "Dear Papa,",
    body: `I've been thinking about all the things you've done for me over the years, and I realized how rarely I say thank you for the things that matter most.

You showed me what it means to be strong, to keep moving even when you're tired, the spirit of quite sacrifice for those you love. You showed me what it means to be kind, by always lending a hand without expecting anything in return. 

Every good quality I have today is a reflection of the lessons you lived out in front of me, day after day. Thank you for being my father, my mentor, and my friend. Thank you for always being there for me, even when i didnt trust myself.`,
    closing: "Always yours,",
    name: "Aditya",
    date: "Father's Day, 2026"
  },

  // ── HIDDEN MESSAGE ────────────────────────────────────
  hiddenMessage: "I love you, Papa. Thanks for always being the best hero to ever be there.",
}
