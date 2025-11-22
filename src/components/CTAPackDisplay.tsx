"use client";

import GlowingTextDisplay from "./GlowingTextDisplay";
import TextDisplay from "./TextDisplay";

interface CTAPackDisplayProps {
  text: string;
  isVisible: boolean;
  backgroundImage?: string;
}

export default function CTAPackDisplay({
  text,
  isVisible,
  backgroundImage,
}: CTAPackDisplayProps) {
  return (
    <>
      <div style={{ zIndex: "20" }}>
        <GlowingTextDisplay text="QuizzyDock" />
      </div>
      <TextDisplay
        text={text}
        isVisible={isVisible}
        type="cta"
        animationDuration={1000}
        textPosition="30%"
        containerHeight="auto"
        backgroundImage={backgroundImage}
      />
    </>
  );
}
