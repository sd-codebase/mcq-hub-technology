"use client";

interface InstagramReelDisplayProps {
  text: string;
  type: "thumbnail" | "hook";
}

export default function InstagramReelDisplay({
  text,
  type,
}: InstagramReelDisplayProps) {
  const getBackgroundStyle = () => ({
    backgroundImage:
      "url('/assets/Gemini_Generated_Image_2uzwhf2uzwhf2uzw.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  const fontSizeClass =
    type === "thumbnail"
      ? "text-5xl md:text-6xl lg:text-7xl"
      : "text-4xl md:text-5xl lg:text-6xl";
  const animationName =
    type === "thumbnail" ? "fadeInOutThumbnail" : "fadeInOutHook";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-full h-full overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.6)" }}
      ></div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Bebas+Neue&family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Bodoni+Moda:wght@400;700&family=Cormorant+Garamond:wght@300;400;700&display=swap');

        @keyframes fadeInOutThumbnail {
          0% {
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes fadeInOutHook {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }

        .reel-text-animate {
          animation: var(--animation-name) var(--animation-duration) ease-in-out forwards;
        }

        .reel-text-thumbnail {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          letter-spacing: 1px;
          color: #f5f5f0;
          text-shadow:
            2px 2px 4px rgba(0, 0, 0, 0.5),
            4px 4px 8px rgba(0, 0, 0, 0.3);
        }

        .reel-text-hook {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          letter-spacing: 1px;
          color: #f5f5f0;
          text-shadow:
            2px 2px 4px rgba(0, 0, 0, 0.5),
            4px 4px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <div
        className={`reel-text-animate text-center px-6 sm:px-8 md:px-12 max-w-5xl relative z-10`}
        style={
          {
            "--animation-name": animationName,
            "--animation-duration": type === "thumbnail" ? "500ms" : "3000ms",
          } as React.CSSProperties
        }
      >
        <p
          className={`${
            type === "thumbnail" ? "reel-text-thumbnail" : "reel-text-hook"
          } ${fontSizeClass} leading-tight`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
