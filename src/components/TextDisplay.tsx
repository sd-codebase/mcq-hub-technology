"use client";

import GlowingTextDisplay from "./GlowingTextDisplay";

interface TextDisplayProps {
  text: string;
  isVisible: boolean;
  type: "thumbnail" | "hook" | "cta";
  testName?: string;
  animationDuration?: number; // in ms
  textPosition?: string; // CSS top value
  containerHeight?: string; // CSS height value
  backgroundImage?: string;
}

export default function TextDisplay({
  text,
  isVisible,
  type,
  testName,
  animationDuration = 10000,
  textPosition = "30%",
  containerHeight = "20vh",
  backgroundImage = "/assets/bg-img-1.png",
}: TextDisplayProps) {
  if (!isVisible || !text) return null;

  const cleanedText = String(text || "")
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .join("\n");

  // Helper function to parse and render bold text and gradient text
  const renderLineWithBold = (line: string) => {
    // First handle double asterisks (bold) and single asterisks (gradient)
    const parts = line.split(/((?<!\*)\*[^*]+\*(?!\*)|\*\*.*?\*\*)/);
    return parts.map((part, idx) => {
      // Double asterisks for bold
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return (
          <strong key={idx} className="font-bold">
            {boldText}
          </strong>
        );
      }
      // Single asterisks for gradient (remove the asterisks)
      if (
        part.startsWith("*") &&
        part.endsWith("*") &&
        !part.startsWith("**")
      ) {
        const gradientText = part.slice(1, -1);
        return (
          <span key={idx} style={{ fontSize: "0.85em" }}>
            {gradientText}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  // Determine styles based on type
  const getTypeStyles = () => {
    switch (type) {
      case "thumbnail":
        return {
          animationName: "fadeInOutText",
          fontFamily: '"Roboto Slab", serif',
          borderLeft: "8px solid",
          borderImage: "linear-gradient(to bottom, #a855f7, #ec4899) 1",
          paddingLeft: "12px",
          showBorder: true,
          showSingleWordBg: true,
        };
      case "hook":
        return {
          animationName: "fadeInOutHook",
          fontFamily: "'Montserrat', sans-serif",
          borderLeft: "8px solid",
          borderImage: "linear-gradient(to bottom, #a855f7, #ec4899) 1",
          paddingLeft: "12px",
          showBorder: true,
          showSingleWordBg: true,
        };
      case "cta":
        return {
          animationName: "fadeInOutText",
          fontFamily: "'Montserrat', sans-serif",
          borderBottom: "10px solid",
          borderImage: "linear-gradient(to right, #a855f7, #ec4899) 1",
          paddingBottom: "24px",
          showBorder: true,
          isCTABorder: true,
          showSingleWordBg: true,
        };
      default:
        return {
          animationName: "fadeInOutText",
          fontFamily: '"Roboto Slab", serif',
          showBorder: false,
          showSingleWordBg: false,
        };
    }
  };

  const typeStyles = getTypeStyles();

  // Get font size classes based on type
  const getFontSizeClasses = () => {
    switch (type) {
      case "thumbnail":
        return "text-5xl md:text-6xl lg:text-7xl";
      case "hook":
        return "text-4xl md:text-4xl lg:text-5xl";
      case "cta":
        return "text-4xl md:text-5xl lg:text-6xl";
      default:
        return "text-5xl md:text-6xl lg:text-7xl";
    }
  };

  const fontSizeClasses = getFontSizeClasses();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-full h-full overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.6)" }}
      ></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=Montserrat:wght@400;600;700&display=swap');

        @keyframes fadeInOutText {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes fadeInOutHook {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .text-display-animate {
          animation: ${
            typeStyles.animationName
          } ${animationDuration}ms ease-in-out forwards;
        }

        .text-display-style {
          font-family: ${typeStyles.fontFamily};
          font-optical-sizing: auto;
          font-style: normal;
          letter-spacing: 1px;
          color: #ffffff;
          padding: 0;
          margin: 0 24px;
          display: block;
          ${
            typeStyles.showBorder
              ? `
          ${
            type !== "cta"
              ? `
          border-left: 8px solid;
          border-image: linear-gradient(to bottom, #a855f7, #ec4899) 1;
          padding-left: ${typeStyles.paddingLeft || "12px"};
          `
              : ""
          }
          ${
            type === "cta"
              ? `
          border-bottom: 10px solid;
          border-image: linear-gradient(to right, #a855f7, #ec4899) 1;
          padding-bottom: ${typeStyles.paddingBottom || "12px"};
          `
              : ""
          }
          `
              : ""
          }
          line-height: 1;
        }

        .text-line {
          display: block;
          margin: 0;
          padding: 0;
        }

        ${
          type === "hook"
            ? `
        .text-display-style {
          margin: 0 24px;
        }
        `
            : ""
        }

        ${
          typeStyles.showSingleWordBg
            ? `
        .text-line.single-word {
          background: linear-gradient(to right, #a855f7, #ec4899);
          padding: 0 8px;
          padding-bottom: 4px;
          border-radius: 4px;
          display: inline-block;
          font-size: 0.95em;
          line-height: 1;
        }
        `
            : ""
        }

        ${
          type === "hook" || type === "cta"
            ? `
        @keyframes slide-up-from-bottom {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .text-line {
          opacity: 0;
          animation: slide-up-from-bottom 0.8s ease-out forwards;
        }

        ${cleanedText
          .split("\n")
          .filter((line) => line.trim().length > 0)
          .map(
            (_, idx) =>
              `.text-line:nth-child(${idx + 1}) { animation-delay: ${
                idx * 0.1
              }s; }`
          )
          .join("")}
        `
            : ""
        }

        p {
          margin: 0;
          padding: 0;
        }
      `}</style>

      <div
        className={`text-display-animate z-10 w-full px-8 md:px-12 lg:px-16 absolute flex items-center ${
          type === "hook" ? "justify-center" : "text-left"
        }`}
        style={{
          top: textPosition,
          height: containerHeight,
          ...(type === "hook" && {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }),
        }}
      >
        <div
          className={`text-display-style ${fontSizeClasses} leading-tight`}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "flex-start",
          }}
        >
          {cleanedText.split("\n").map((line, idx) => {
            const trimmedLine = line.trim();
            const hasGradientBackground = /(?<!\*)\*[^*]+\*(?!\*)/.test(
              trimmedLine
            );
            const isSingleWord =
              typeStyles.showSingleWordBg &&
              hasGradientBackground &&
              trimmedLine.length > 0;

            return (
              <span
                key={idx}
                className={`text-line ${isSingleWord ? "single-word" : ""}`}
              >
                {renderLineWithBold(trimmedLine)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Test Name at 75% height - Horizontally Centered */}
      {testName && (
        <div
          className="absolute w-full flex justify-center"
          style={{ top: "70%" }}
        >
          <p
            className="text-xl md:text-xl lg:text-4xl font-bold text-white text-center rounded-lg"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              background: "linear-gradient(to right, #a855f7, #ec4899)",
              padding: "2px 4px",
            }}
          >
            {testName}
          </p>
        </div>
      )}
    </div>
  );
}
