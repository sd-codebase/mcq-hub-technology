"use client";

import TextDisplay from "./TextDisplay";

interface ThumbnailDisplayProps {
  text: string;
  isVisible: boolean;
  testName?: string;
}

export default function ThumbnailDisplay({
  text,
  isVisible,
  testName,
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
    />
  );
}
