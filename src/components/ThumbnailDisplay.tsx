"use client";

import TextDisplay from "./TextDisplay";

interface ThumbnailDisplayProps {
  text: string;
  isVisible: boolean;
  testName?: string;
  backgroundImage?: string;
}

export default function ThumbnailDisplay({
  text,
  isVisible,
  testName,
  backgroundImage,
}: ThumbnailDisplayProps) {
  return (
    <TextDisplay
      text={text}
      isVisible={isVisible}
      type="thumbnail"
      testName={testName}
      animationDuration={10000}
      textPosition="30%"
      containerHeight="20vh"
      backgroundImage={backgroundImage}
    />
  );
}
