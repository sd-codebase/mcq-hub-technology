import React from "react";
import GlowingTextTopLeft from "@/components/GlowingTextTopLeft";
import FormattedGlowingText from "@/components/FormattedGlowingText";
import SocialLinks from "@/components/SocialLinks";

interface Scene3Props {
  text: string;
  children?: React.ReactNode;
}

export default function Scene3({ text, children }: Scene3Props) {
  return (
    <>
      <style>{`
        @keyframes fadeInContent {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .content-feature {
          animation: fadeInContent 0.8s ease-out forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }

        .scene3-content {
        width: 25rem;
          margin-left: auto;
          margin-right: auto;
          padding: 2rem;
          text-align: center;
          border-radius: 1rem;
          border: 1px solid rgba(99, 102, 241, 0.5);
          background: linear-gradient(135deg, #1c1c3c, #0a0a0a);
          box-shadow: 0 20px 50px rgba(75, 0, 130, 0.4);
          margin-inline: 2rem;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      {/* Glowing Text Top */}
      <div className="absolute z-20" style={{ left: "20rem", top: "6rem" }}>
        <GlowingTextTopLeft
          text="QuizzyDock"
          fontSize="3rem"
          fontFamily="'Montserrat', sans-serif"
        />
      </div>

      {/* Glowing Text Middle */}
      <div className="absolute top-1/2  z-20" style={{ left: "8rem" }}>
        <FormattedGlowingText text={text} isVisible={true} />
      </div>

      {/* Content Frame */}
      <div
        className="absolute top-1/2 right-20 transform -translate-y-1/2 z-20"
        style={{ right: "8rem" }}
      >
        <div className="content-feature">
          <div className="scene3-content">
            {children || <SocialLinks />}
          </div>
        </div>
      </div>
    </>
  );
}
