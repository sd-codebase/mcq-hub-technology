"use client";

interface HookDisplayProps {
  text: string;
  isVisible: boolean;
}

export default function HookDisplay({ text, isVisible }: HookDisplayProps) {
  if (!isVisible || !text) return null;

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
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

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

        .hook-text-animate {
          animation: fadeInOutHook 2000ms ease-in-out forwards;
        }

        .hook-text-style {
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

      <div className="hook-text-animate text-left relative z-10 w-full px-8 md:px-12 lg:px-16">
        <p className="hook-text-style text-4xl md:text-5xl lg:text-6xl leading-tight">
          {text}
        </p>
      </div>
    </div>
  );
}
