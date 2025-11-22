"use client";

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
  if (!isVisible || !text) return null;

  const cleanedText = String(text || "")
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .join("\n");

  // Helper function to parse and render bold text
  const renderLineWithBold = (line: string) => {
    const parts = line.split(/(\*\*.*?\*\*)/);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        // Bold text - remove the ** markers
        const boldText = part.slice(2, -2);
        return (
          <strong key={idx} className="font-bold">
            {boldText}
          </strong>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-full h-full overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/Gemini_Generated_Image_2uzwhf2uzwhf2uzw.png')",
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

        @keyframes fadeInOutThumbnail {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }

        .thumbnail-text-animate {
          animation: fadeInOutThumbnail 10000ms ease-in-out forwards;
        }

        .thumbnail-text-style {
          font-family: "Roboto Slab", serif;
          font-optical-sizing: auto;
          font-style: normal;
          letter-spacing: 1px;
          color: #ffffff;
          padding: 0;
          margin: 0 40px;
          display: block;
          border-left: 8px solid;
          border-image: linear-gradient(to bottom, #a855f7, #ec4899) 1;
          padding-left: 12px;
          line-height: 1;
        }

        .text-line {
          display: block;
          margin: 0;
          padding: 0;
        }

        .text-line.single-word {
          background: linear-gradient(to right, #a855f7, #ec4899);
          padding: 0 8px;
          padding-bottom: 4px;
          border-radius: 4px;
          display: inline-block;
          font-size: 0.95em;
          line-height: 1;
        }

        p {
          margin: 0;
          padding: 0;
        }
      `}</style>

      <div
        className="thumbnail-text-animate text-left z-10 w-full px-8 md:px-12 lg:px-16 absolute flex items-center"
        style={{ top: "30%", height: "20vh" }}
      >
        <div
          className="thumbnail-text-style text-5xl md:text-6xl lg:text-7xl leading-tight"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "flex-start",
          }}
        >
          {cleanedText.split("\n").map((line, idx) => {
            const wordCount = line.trim().split(/\s+/).length;
            const isSingleWord = wordCount === 1 && line.trim().length > 0;

            return (
              <span
                key={idx}
                className={`text-line ${isSingleWord ? "single-word" : ""}`}
              >
                {renderLineWithBold(line)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Test Name at 75% height - Horizontally Centered */}
      {testName && (
        <div
          className="absolute w-full flex justify-center"
          style={{ top: "75%" }}
        >
          <p
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center rounded-lg"
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
