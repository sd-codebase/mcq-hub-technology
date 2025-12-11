import React from "react";
import GlowingTextTopLeft from "@/components/GlowingTextTopLeft";
import FormattedGlowingText from "@/components/FormattedGlowingText";

interface Scene2Props {
  videoSource?: string;
  text: string;
  subtext?: string;
}

export default function Scene2({ videoSource, text, subtext }: Scene2Props) {
  // Calculate timing for text animation
  const textLines = text
    .split("\n")
    .filter((line) => line.trim().length > 0).length;
  const textAnimationDuration = (textLines - 1) * 0.3 + 0.5; // Same calculation as FormattedGlowingText
  const textBorderDelay = textAnimationDuration; // Border appears after text is done
  const textBorderDuration = 0.5;

  // Fade out main text timing (only if subtext exists)
  const textFadeOutDelay = textBorderDelay + textBorderDuration + 1; // 1 second pause after border
  const textFadeOutDuration = 0.5;

  // Subtext timing (only if present)
  const subtextStartDelay = textFadeOutDelay + textFadeOutDuration; // Starts after main text fades out
  const subtextLines = subtext
    ? subtext.split("\n").filter((line) => line.trim().length > 0).length
    : 0;
  const subtextAnimationDuration = (subtextLines - 1) * 0.3 + 0.5;

  return (
    <>
      <style>{`
        // @keyframes fadeInVideo {
        //   0% {
        //     opacity: 0;
        //     transform: translateY(20px);
        //   }
        //   100% {
        //     opacity: 1;
        //     transform: translateY(0);
        //   }
        // }

        // @keyframes fadeOutMainText {
        //   0% {
        //     opacity: 1;
        //   }
        //   100% {
        //     opacity: 0;
        //   }
        // }

        // @keyframes showSubtext {
        //   0% {
        //     opacity: 0;
        //   }
        //   100% {
        //     opacity: 1;
        //   }
        // }

        // .video-feature {
        //   animation: fadeInVideo 0.8s ease-out forwards;
        //   animation-delay: 0.5s;
        //   opacity: 0;
        // }

        .video-feature video {
          borderRadius: 40px;
          border: 4px solid #fff;
          paddingTop: 12px;
          width: 350px;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .scene2-text-wrapper {
          position: relative;
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
        <div className="scene2-text-wrapper">
          {/* Main Text - renders with its own animations, fades out if subtext exists */}
          <div
            style={
              subtext
                ? {
                    animation: `fadeOutMainText ${textFadeOutDuration}s ease-out forwards`,
                    animationDelay: `${textFadeOutDelay}s`,
                  }
                : {}
            }
          >
            <FormattedGlowingText text={text} isVisible={true} />
          </div>

          {/* Subtext - renders one by one after main text fades out */}
          {subtext && (
            <div
              style={{
                marginTop: "2rem",
                opacity: 0,
                animation: `showSubtext ${
                  subtextAnimationDuration + 1
                }s ease-out forwards`,
                animationDelay: `${subtextStartDelay}s`,
              }}
            >
              <FormattedGlowingText text={subtext} isVisible={true} />
            </div>
          )}
        </div>
      </div>

      {/* Video Frame */}
      <div
        className="absolute top-1/2 right-20 transform -translate-y-1/2 z-20"
        style={{ right: "12rem" }}
      >
        <div className="video-feature">
          <video
            src={videoSource}
            autoPlay
            loop={false}
            muted
            playsInline
            style={{
              borderRadius: "40px",
              border: "4px solid #fff",
              paddingTop: "12px",
              width: "350px",
              height: "auto",
            }}
          />
        </div>
      </div>
    </>
  );
}
