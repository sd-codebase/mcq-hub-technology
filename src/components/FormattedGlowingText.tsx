"use client";

interface FormattedGlowingTextProps {
  text: string;
  isVisible?: boolean;
  lineAnimationDuration?: number; // Duration in seconds for each line animation
  lineStaggerDelay?: number; // Delay in seconds between each line
}

export default function FormattedGlowingText({
  text,
  isVisible = true,
  lineAnimationDuration = 0.5,
  lineStaggerDelay = 0.3,
}: FormattedGlowingTextProps) {
  if (!isVisible || !text) return null;

  const cleanedText = String(text || "")
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .join("\n");

  // Parse and render text with formatting (matches TextDisplay)
  const renderLineWithBold = (line: string) => {
    const parts = line.split(/(#[^#]+#|\*[^*]+\*)/);
    return parts.map((part, idx) => {
      // Asterisks for bold
      if (part.startsWith("*") && part.endsWith("*")) {
        const boldText = part.slice(1, -1);
        return (
          <strong key={idx} className="font-bold">
            {boldText}
          </strong>
        );
      }
      // Hash for gradient background
      if (part.startsWith("#") && part.endsWith("#")) {
        const gradientText = part.slice(1, -1);
        return (
          <span
            key={idx}
            style={{
              background: "linear-gradient(to right, #a855f7, #ec4899)",
              padding: "0px 4px",
              borderRadius: "4px",
              display: "inline-block",
              fontSize: "0.95em",
              lineHeight: "1",
            }}
          >
            {gradientText}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const lines = cleanedText.split("\n");
  const numberOfLines = lines.length;
  // Calculate when all lines finish rendering based on animation duration and stagger
  const borderDelay = (numberOfLines - 1) * lineStaggerDelay + lineAnimationDuration;

  return (
    <>
      <style>{`
        @keyframes revealLine {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes revealBorder {
          0% {
            border-bottom-width: 0;
          }
          100% {
            border-bottom-width: 8px;
          }
        }

        .formatted-text-container {
          border-bottom: 0px solid;
          border-image: linear-gradient(to right, #a855f7, #ec4899) 1;
          padding-bottom: 12px;
          animation: revealBorder 0.5s ease-out forwards;
        }

        .formatted-thumbnail-text {
          font-family: "Roboto Slab", serif;
          font-size: 3rem;
          font-weight: 600;
          color: #ffffff;
          text-align: left;
          margin: 0;
          padding: 0;
          animation: revealLine ${lineAnimationDuration}s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div
        className="formatted-text-container"
        style={{ animationDelay: `${borderDelay}s` }}
      >
        {lines.map((line, idx) => (
          <p
            key={idx}
            className="formatted-thumbnail-text"
            style={{ animationDelay: `${idx * lineStaggerDelay}s` }}
          >
            {renderLineWithBold(line)}
          </p>
        ))}
      </div>
    </>
  );
}
