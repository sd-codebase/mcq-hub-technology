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
          margin-top: 200px;
          align-items: start;
          justify-content: center;
        }

        .glowing-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 2rem;
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
      `}</style>

      <div className="glowing-text-container">
        <h1 className="glowing-text">{text}</h1>
      </div>
    </div>
  );
}
