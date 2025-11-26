import React from "react";

interface SocialMediaVideosHeaderProps {
  title?: string;
  description?: string;
}

export default function SocialMediaVideosHeader({
  title = "Social Media Videos",
  description = "Explore our collection of educational videos designed to help you master technical concepts and prepare for your coding journey.",
}: SocialMediaVideosHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
        {title}
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">{description}</p>
    </div>
  );
}
