"use client";

interface GlowingTextDisplayProps {
  text: string;
  isVisible?: boolean;
}

export default function GlowingTextDisplay({
  text,
  isVisible = true,
}: GlowingTextDisplayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full overflow-hidden">
      <style>{`
        .glowing-text-container {
          width: 100%;
          height: 100%;
          display: flex;
          margin-bottom: 400px;
          align-items: flex-end;
          justify-content: center;
        }

        .glowing-text-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          padding: 8px 16px;
          border: 2px solid rgba(168, 85, 247, 0.4);
          border-radius: 50px;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(168, 85, 247, 0.1);
        }

        .glowing-icon {
          color: #ffffff;
          animation: glow-pulse-icon 3s ease-in-out infinite;
          width: 1em;
          height: 1em;
          flex-shrink: 0;
          paddint-top: 8px;
        }

        .glowing-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: #ffffff;
          text-align: center;
          letter-spacing: 0.05em;
          margin: 0;
          padding: 0;
          text-shadow:
            0 0 10px rgba(168, 85, 247, 0.5),
            0 0 20px rgba(168, 85, 247, 0.4),
            0 0 30px rgba(236, 72, 153, 0.3),
            0 0 40px rgba(236, 72, 153, 0.2);
          filter: brightness(1.1);
          animation: glow-pulse 3s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0% {
            text-shadow:
              0 0 10px rgba(168, 85, 247, 0.5),
              0 0 20px rgba(168, 85, 247, 0.4),
              0 0 30px rgba(236, 72, 153, 0.3),
              0 0 40px rgba(236, 72, 153, 0.2);
          }
          50% {
            text-shadow:
              0 0 15px rgba(168, 85, 247, 0.6),
              0 0 30px rgba(168, 85, 247, 0.5),
              0 0 45px rgba(236, 72, 153, 0.4),
              0 0 60px rgba(236, 72, 153, 0.3);
          }
          100% {
            text-shadow:
              0 0 10px rgba(168, 85, 247, 0.5),
              0 0 20px rgba(168, 85, 247, 0.4),
              0 0 30px rgba(236, 72, 153, 0.3),
              0 0 40px rgba(236, 72, 153, 0.2);
          }
        }

        @keyframes glow-pulse-icon {
          0% {
            filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5)) drop-shadow(0 0 20px rgba(168, 85, 247, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 30px rgba(168, 85, 247, 0.5)) drop-shadow(0 0 45px rgba(236, 72, 153, 0.4));
          }
          100% {
            filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5)) drop-shadow(0 0 20px rgba(168, 85, 247, 0.4));
          }
        }
      `}</style>

      <div className="glowing-text-container">
        <div className="glowing-text-wrapper">
          <svg
            className="glowing-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <h1 className="glowing-text">{text}</h1>
        </div>
      </div>
    </div>
  );
}
