"use client";

import GlowingTextDisplay from "./GlowingTextDisplay";
import TextDisplay from "./TextDisplay";

interface CTAPackDisplayProps {
  text: string;
  isVisible: boolean;
  backgroundImage?: string;
  testData?: {
    questionType: string;
    testName: string;
    subtopicName: string;
  };
}

export default function CTAPackDisplay({
  text,
  isVisible,
  backgroundImage,
  testData,
}: CTAPackDisplayProps) {
  const handleCopyMetadata = () => {
    if (!testData) return;

    const formatText = (text: string) =>
      text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const copyText = `${testData.questionType}-${formatText(testData.testName)}-${formatText(testData.subtopicName)}`;
    navigator.clipboard.writeText(copyText).then(() => {
      console.log("Copied to clipboard:", copyText);
    }).catch((err) => {
      console.error("Failed to copy to clipboard:", err);
    });
  };

  return (
    <>
      <div style={{ zIndex: "20" }}>
        <GlowingTextDisplay
          text="QuizzyDock"
          onClick={handleCopyMetadata}
        />
      </div>
      <TextDisplay
        text={text}
        isVisible={isVisible}
        type="cta"
        animationDuration={1000}
        textPosition="30%"
        containerHeight="auto"
        backgroundImage={backgroundImage}
        isPreview={true}
      />
    </>
  );
}
