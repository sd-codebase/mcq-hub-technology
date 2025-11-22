"use client";

import TextDisplay from "./TextDisplay";

interface HookDisplayProps {
  text: string;
  isVisible: boolean;
}

export default function HookDisplay({ text, isVisible }: HookDisplayProps) {
  return (
    <TextDisplay
      text={text}
      isVisible={isVisible}
      type="hook"
      animationDuration={4000}
      textPosition="35%"
    />
  );
}
