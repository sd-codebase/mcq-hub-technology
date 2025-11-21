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
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=Montserrat:wght@400;600;700&display=swap');

        @keyframes fadeInOutThumbnail {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 1;
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
          font-family: "Roboto Slab", serif;
          font-optical-sizing: auto;
          font-weight: 700;
          font-style: normal;
          letter-spacing: 1px;
          color: #000000;
          background-color: #ffffff;
          padding: 4px;
          margin: 0 40px;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          display: inline-block;
        }

        .reel-text-hook {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          letter-spacing: 1px;
          color: #000000;
          background-color: #ffffff;
          padding: 4px;
          margin: 0 40px;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          display: inline-block;
        }
      `}</style>

      <div
        className={`reel-text-animate text-center relative z-10`}
        style={
          {
            "--animation-name": animationName,
            "--animation-duration": type === "thumbnail" ? "7000ms" : "2000ms",
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
