import React from "react";

interface ComingSoonSectionProps {
  title?: string;
  description?: string;
}

export default function ComingSoonSection({
  title = "Coming Soon",
  description = "More exciting educational content is being added regularly. Stay tuned for videos covering advanced topics, coding tutorials, and interview preparation strategies.",
}: ComingSoonSectionProps) {
  return (
    <div className="mt-16 p-8 rounded-2xl border border-purple-600/30 bg-gray-900/50">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
        {title}
      </h2>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
