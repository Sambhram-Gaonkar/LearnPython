"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import type { SpecialUserConfig } from "@/lib/specialUser";

type SpecialUserExperienceProps = {
  config: SpecialUserConfig;
  progressPercent: number;
};

export function SpecialUserExperience({ config, progressPercent }: SpecialUserExperienceProps) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const completed = progressPercent >= 100;

  useEffect(() => {
    if (!config.enabled) {
      return;
    }

    if (completed) {
      setShowCompletion(true);
      return;
    }

    if (!sessionStorage.getItem("special-welcome-seen")) {
      setShowWelcome(true);
      sessionStorage.setItem("special-welcome-seen", "true");
    }
  }, [completed, config.enabled]);

  if (!config.enabled) {
    return null;
  }

  return (
    <>
      {showWelcome && (
        <Modal title={config.welcomeTitle} message={config.welcomeMessage} image={config.welcomeImage} onClose={() => setShowWelcome(false)} />
      )}

      {showCompletion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 px-4 py-8 backdrop-blur-sm">
          <Confetti />
          <div className="relative w-full max-w-xl rounded-lg bg-white p-6 text-center shadow-soft">
            <button
              className="absolute right-4 top-4 rounded-md p-2 text-ink/50 hover:bg-ink/5 hover:text-ink"
              onClick={() => setShowCompletion(false)}
              aria-label="Close congratulations"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint/10 text-mint">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-ink">{config.completionTitle}</h2>
            <p className="mt-3 leading-7 text-ink/70">{config.completionMessage}</p>
            <ImageBox src={config.certificateImage} alt="Certificate" />
          </div>
        </div>
      )}

    </>
  );
}

function Modal({ title, message, image, onClose }: { title: string; message: string; image: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 px-4 py-8 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-soft">
        <button className="absolute right-4 top-4 rounded-md p-2 text-ink/50 hover:bg-ink/5 hover:text-ink" onClick={onClose} aria-label="Close message">
          <X className="h-5 w-5" />
        </button>
        <h2 className="pr-10 text-2xl font-bold text-ink">{title}</h2>
        <p className="mt-3 leading-7 text-ink/70">{message}</p>
        <ImageBox src={image} alt={title} />
        <button className="mt-5 w-full rounded-md bg-mint px-4 py-2.5 font-semibold text-white hover:bg-mint/90" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}

function ImageBox({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mt-5 overflow-hidden rounded-lg border border-ink/10 bg-paper">
      <Image src={src} alt={alt} width={720} height={420} className="h-auto w-full object-cover" unoptimized />
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 28 }, (_, index) => index);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece}
          className="absolute top-[-10%] h-3 w-2 animate-[confetti_2.8s_linear_infinite] rounded-sm"
          style={{
            left: `${(piece * 37) % 100}%`,
            animationDelay: `${(piece % 8) * 0.18}s`,
            backgroundColor: ["#1f8a70", "#d95550", "#4c6f8f", "#f2b84b"][piece % 4]
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(115vh) rotate(720deg);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
