import { Inter, Playfair_Display, Lora, Fira_Code } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/components/AudioContext";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "Dear Dad — A Digital Tribute",
  description: "A beautiful, premium digital tribute dedicated to the person who gave me everything. Happy Father's Day.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${lora.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="bg-[#0f172a] text-[#f8fafc] font-sans-ui min-h-full flex flex-col">
        <AudioProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
