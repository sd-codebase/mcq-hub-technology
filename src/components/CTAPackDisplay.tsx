"use client";

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
    <TextDisplay
      text={text}
      isVisible={isVisible}
      type="cta"
      animationDuration={1000}
      textPosition="40%"
      containerHeight="auto"
    />
  );
}
