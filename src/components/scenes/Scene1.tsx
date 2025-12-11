import React from "react";
import Image from "next/image";
import VideoFrame from "@/components/VideoFrame";
import GlowingTextTopLeft from "@/components/GlowingTextTopLeft";
import FormattedGlowingText from "@/components/FormattedGlowingText";

interface Scene1Props {
  imageSource?: string;
  text: string;
}

export default function Scene1({
  imageSource = "/scenes/scene1-1.png",
  text,
}: Scene1Props) {
  return (
    <>
      <style>{`
        // @keyframes fadeInImage {
        //   0% {
        //     opacity: 0;
        //   }
        //   100% {
        //     opacity: 1;
        //   }
        // }

        // .img-feature {
        //   animation: fadeInImage 0.4s ease-out forwards;
        //   animation-delay: 0.5s;
        //   opacity: 0;
        // }
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
      <div
        className="absolute top-1/2  z-20"
        style={{ left: "8rem", paddingTop: "4rem" }}
      >
        <FormattedGlowingText
          text={text}
          isVisible={true}
          lineAnimationDuration={0.3}
          lineStaggerDelay={0.1}
        />
      </div>

      {/* Video Frame */}
      <div
        className="absolute top-1/2 right-20 transform -translate-y-1/2 z-20"
        style={{ right: "12rem" }}
      >
        <div className="img-feature">
          <img
            src={imageSource}
            alt="QuizzyDock"
            className="w-full h-full object-cover rounded-lg"
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
