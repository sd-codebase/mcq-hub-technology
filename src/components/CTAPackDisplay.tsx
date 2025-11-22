"use client";

interface CTAPackDisplayProps {
  text: string;
  isVisible: boolean;
}

export default function CTAPackDisplay({
  text,
  isVisible,
}: CTAPackDisplayProps) {
  if (!isVisible || !text) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-full h-full"
      style={{
        backgroundImage:
          "url('/assets/Gemini_Generated_Image_2uzwhf2uzwhf2uzw.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');

        .cta-text-style {
          font-family: "Roboto Slab", serif;
          font-optical-sizing: auto;
          font-weight: 700;
          font-style: normal;
          color: #000000;
          background-color: #ffffff;
          padding: 4px;
          margin: 0 40px;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          display: inline-block;
        }
      `}</style>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.5)" }}
      ></div>

      <p className="cta-text-style text-4xl md:text-5xl lg:text-6xl leading-tight text-left px-8 md:px-12 lg:px-16 max-w-5xl relative z-10">
        {text}
      </p>
    </div>
  );
}
