import React, { useMemo } from "react";

// Define the core component
export const TechLogoGenerator = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  // Use useMemo to safely parse the text and split the first letter from the rest
  const { firstLetter, restOfText } = useMemo(() => {
    if (!text || text.length === 0) {
      return { firstLetter: "", restOfText: "" };
    }
    // Capitalize the first letter just in case it's passed in lowercase
    const first = text.charAt(0).toUpperCase();
    const rest = text.slice(1);
    return { firstLetter: first, restOfText: rest };
  }, [text]);

  // Define custom Tailwind-like classes to capture the app's aesthetic
  // This gradient is used for the *first letter* for maximum pop.
  const primaryGradientClassName =
    "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500";

  // This new gradient is used for the *rest of the text* (more subtle, white-to-light-blue).
  const secondaryGradientClassName =
    "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-blue-300";

  const containerClass = `inline-flex items-center space-x-0.5 px-4 py-2 
                          rounded-xl shadow-lg 
                          bg-gray-800/70 border border-gray-700/50 
                          transform transition-transform duration-300 hover:scale-[1.02] 
                          ${className}`;

  if (!text) return null;

  return (
    <div className={containerClass}>
      {/* Container for the logo text */}
      <span className="flex items-center text-2xl font-extrabold tracking-tight">
        {/* The First Letter: Highlighted with the distinctive purple-blue gradient */}
        <span
          className={`text-4xl ${primaryGradientClassName}`}
          style={{
            // Re-setting the background image style inline for explicit gradient colors
            backgroundImage: "linear-gradient(90deg, #a855f7 0%, #6366f1 100%)",
          }}
        >
          {firstLetter}
        </span>

        {/* The Rest of the Text: Now uses a subtle secondary gradient */}
        <span
          className={`ml-0.5 ${secondaryGradientClassName}`}
          style={{
            // Subtle white to light blue gradient
            backgroundImage: "linear-gradient(90deg, #e5e7eb 0%, #93c5fd 100%)",
          }}
        >
          {restOfText}
        </span>
      </span>
    </div>
  );
};
