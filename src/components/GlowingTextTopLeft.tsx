"use client";

interface GlowingTextTopLeftProps {
  text: string;
  isVisible?: boolean;
  fontSize?: string;
  fontFamily?: string;
  glowColor?: string;
  textColor?: string;
}

export default function GlowingTextTopLeft({
  text,
  isVisible = true,
  fontSize = "1.5rem",
  fontFamily = "'Montserrat', sans-serif",
  glowColor = "rgba(168, 85, 247, 0.5)",
  textColor = "#ffffff",
}: GlowingTextTopLeftProps) {
  if (!isVisible) return null;

  return (
    <>
      <style>{`
        .glowing-text-label {
          font-weight: 600;
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
          transition: all 0.3s ease;
        }

        .glowing-text-label:hover {
          text-shadow:
            0 0 15px rgba(168, 85, 247, 0.6),
            0 0 30px rgba(168, 85, 247, 0.5),
            0 0 45px rgba(236, 72, 153, 0.4),
            0 0 60px rgba(236, 72, 153, 0.3);
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

      <h1
        className="glowing-text-label"
        style={{
          fontSize,
          fontFamily,
          color: textColor,
          textShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 30px ${glowColor}, 0 0 40px ${glowColor}`
        }}
      >
        {text}
      </h1>
    </>
  );
}
