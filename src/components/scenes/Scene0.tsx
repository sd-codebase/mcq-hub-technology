"use client";

import React from "react";
import GlowingTextTopLeft from "@/components/GlowingTextTopLeft";

interface Scene0Props {
  text?: string;
  fontSize?: string;
  fontFamily?: string;
}

export default function Scene0({
  text = "Welcome",
  fontSize = "4rem",
  fontFamily = "'Poppins', sans-serif",
}: Scene0Props) {
  return (
    <>
      <style>{`
        .scene0-wrapper {
          position: absolute;
          inset: 0;
          z-index: 20;
          overflow: hidden;
        }

        .scene0-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* Black background that covers everything initially */
        .scene0-black-screen {
          position: absolute;
          inset: 0;
          background: #000;
          z-index: 10;
          animation: screenFadeOut 4s ease-in-out forwards;
        }

        /* Left slide animation */
        .scene0-frame-left {
          position: absolute;
          top: 0;
          width: 100%;
          height: 50%;
          background: black;
          animation: slideLeftAnimation 1s ease-out forwards;
          z-index: 30;
        }

        /* Right slide animation */
        .scene0-frame-right {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 100%);
          animation: slideRightAnimation 1s ease-out forwards;
          z-index: 30;
          box-shadow: inset 20px 0 40px rgba(0,0,0,0.8);
        }

        /* Centered text container */
        .scene0-text-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 25;
          opacity: 0;
          animation: bioscopRevealText 1.2s ease-out forwards;
          animation-delay: 0.3s;
        }

        /* Light rays effect */
        .scene0-light-rays {
          position: absolute;
          inset: 0;
          z-index: 15;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 30%),
            linear-gradient(0deg, rgba(255,255,255,0.1) 0%, transparent 30%);
          animation: lightRaysGlow 1.2s ease-out forwards;
          animation-delay: 0.2s;
        }

        /* Left slide moves to the left */
        @keyframes slideLeftAnimation {
          0% {
            transform: translateY(50%);
            opacity: 1;
          }
          100% {
            transform: translateY(-110%);
            opacity: 0;
          }
        }

        /* Right slide moves to the right */
        @keyframes slideRightAnimation {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(110%);
            opacity: 0;
          }
        }

        /* Text reveal with smooth effect */
        @keyframes bioscopRevealText {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            filter: blur(0px);
          }
        }

        /* Black screen fade out */
        @keyframes screenFadeOut {
          0% {
            opacity: 1;
          }
          60% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
          }
        }

        /* Light rays glow effect */
        @keyframes lightRaysGlow {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>

      <div className="scene0-wrapper">
        <div className="scene0-container">
          {/* Black screen background */}
          <div className="scene0-black-screen" />

          {/* Light rays effect */}
          <div className="scene0-light-rays" />

          {/* Left slide moving upward */}
          <div className="scene0-frame-left" />

          {/* Right slide moving downward */}
          <div className="scene0-frame-right" />

          {/* Centered glowing text */}
          <div className="scene0-text-container">
            <GlowingTextTopLeft
              text={text}
              fontSize={fontSize}
              fontFamily={fontFamily}
            />
          </div>
        </div>
      </div>
    </>
  );
}
