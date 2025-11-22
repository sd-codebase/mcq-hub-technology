"use client";

import GlowingTextDisplay from "./GlowingTextDisplay";
import TextDisplay from "./TextDisplay";

interface CTAPackDisplayProps {
  text: string;
  isVisible: boolean;
}

export default function CTAPackDisplay({
  text,
  isVisible,
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
        textPosition="25%"
        containerHeight="auto"
      />
    </>
  );
}
