"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/shared/MaterialIcon";

interface EnvelopeAnimationProps {
  onOpen: () => void;
  coupleInitials: string;
}

export function EnvelopeAnimation({ onOpen, coupleInitials }: EnvelopeAnimationProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    
    setTimeout(() => {
      onOpen();
    }, 1700);
  };

  return (
    <div
      className={`intro-screen fixed inset-0 z-[100] bg-primary flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        isOpening ? "opacity-0 scale-110" : ""
      }`}
      style={{ backgroundColor: "rgb(2, 54, 37)" }}
    >
      <div
        className="envelope-wrapper relative w-80 h-56 cursor-pointer group perspective-[1500px]"
        style={{ width: "320px", height: "224px" }}
      >
        <div
          className={`envelope w-full h-full bg-[#e8e4de] shadow-2xl rounded-sm border border-white/10 relative transition-transform duration-800 transform-style-preserve-3d ${
            isOpening ? "open" : ""
          }`}
          onClick={handleOpen}
        >
          {/* Flap */}
          <div
            className={`absolute top-0 left-0 w-full h-1/2 bg-[#e8e4de] border-t border-white/20 transition-transform duration-600 ease-in-out origin-top ${
              isOpening ? "rotate-x-180 z-0" : "z-20"
            }`}
            style={{
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            }}
          />

          {/* Envelope Body */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 border-8 border-white/5 pointer-events-none" />
            
            {/* Wax Seal */}
            <div
              className={`w-16 h-16 bg-[#C8A96B] rounded-full shadow-lg flex items-center justify-center z-30 transition-all duration-500 group-hover:scale-110 ${
                isOpening ? "scale-0 rotate-180 opacity-0" : ""
              }`}
            >
              <MaterialIcon icon="favorite" className="text-white text-3xl" filled />
            </div>

            <div className="absolute bottom-4 text-primary/40 font-label-caps text-label-caps tracking-widest uppercase z-20">
              {coupleInitials}
            </div>
          </div>

          {/* Letter Card */}
          <div
            className={`absolute top-[5%] left-[5%] w-[90%] h-[90%] bg-white shadow-lg flex flex-col items-center justify-center p-6 text-center z-10 transition-transform duration-800 ${
              isOpening ? "-translate-y-[120%]" : ""
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          >
            <div className="font-display-lg-mobile text-headline-sm text-primary">
              You&apos;re Invited
            </div>
            <div className="mt-2 h-px w-8 bg-primary/20" />
          </div>
        </div>
      </div>

      <p
        className={`absolute bottom-12 text-white/50 font-label-caps text-label-caps tracking-[0.2em] animate-pulse ${
          isOpening ? "opacity-0" : ""
        }`}
        style={{ color: "rgba(255, 255, 255, 0.5)" }}
      >
        TAP TO OPEN
      </p>
    </div>
  );
}
