"use client";

import TextDisplay from "./TextDisplay";

interface HookDisplayProps {
  text: string;
  isVisible: boolean;
  backgroundImage?: string;
}

export default function HookDisplay({ text, isVisible, backgroundImage }: HookDisplayProps) {
  return (
    <TextDisplay
      text={text}
      isVisible={isVisible}
      type="hook"
      animationDuration={4000}
      textPosition="35%"
      backgroundImage={backgroundImage}
      isPreview={true}
    />
  );
}
