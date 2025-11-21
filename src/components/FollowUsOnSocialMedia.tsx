"use client";

import React, { JSX } from "react";

// Icon Components
const YouTubeIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.807 0-9.716h3.554v1.375c.427-.659 1.191-1.598 2.897-1.598 2.117 0 3.704 1.384 3.704 4.361v5.578zM5.337 6.556a2.065 2.065 0 1 1 0-4.132 2.065 2.065 0 0 1 0 4.132zm1.784 13.896H3.554V8.736h3.567v11.716zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.63c-.79.297-1.427.772-1.944 1.289-.517.517-.992 1.155-1.289 1.944-.297.788-.5 1.658-.56 2.935C.015 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.263 2.148.56 2.935.297.789.772 1.426 1.289 1.943.517.517 1.155.992 1.944 1.289.788.297 1.659.5 2.935.56 1.28.058 1.687.072 4.947.072s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.935-.56.789-.297 1.426-.772 1.944-1.289.517-.517.992-1.155 1.288-1.944.297-.787.5-1.658.56-2.935.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.56-2.935-.297-.789-.772-1.426-1.289-1.944-.517-.517-1.155-.992-1.944-1.289-.788-.297-1.659-.5-2.935-.56C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.07 1.171.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.061 1.264.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.055 1.171-.249 1.805-.415 2.231-.217.562-.477.96-.896 1.381-.42.419-.819.679-1.381.896-.422.164-1.055.36-2.227.413-1.231.061-1.617.07-4.849.07s-3.585-.009-4.849-.07c-1.171-.055-1.805-.249-2.231-.415-.562-.217-.96-.477-1.381-.896a3.709 3.709 0 0 1-.896-1.381c-.164-.422-.36-1.055-.413-2.231-.061-1.264-.07-1.646-.07-4.849s.009-3.585.07-4.849c.055-1.171.249-1.805.415-2.231.217-.562.477-.96.896-1.381.42-.419.819-.679 1.381-.896.422-.164 1.055-.36 2.227-.413 1.264-.061 1.646-.07 4.849-.07" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a8.06 8.06 0 00-4.255 1.111l-.305.175-3.158-.829.844 3.051.194.309a8.007 8.007 0 001.232 4.038l.276.398 4.572.224c.51 0 1.021-.035 1.529-.104l.43-.047 3.158.829-.844-3.051-.194-.31a8.007 8.007 0 00-1.232-4.038l-.276-.398-4.572-.224m5.421 7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
  </svg>
);

const PlayStoreIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.609 1.814L13.792 12 3.609 22.186A.996.996 0 0 1 3 21.814V2.186c0-.35.189-.673.609-.372zm16.168.536c-.42-.384-1.008-.418-1.511-.106l-7.737 5.6 5.848 5.856 7.737-5.6c.503-.312.832-.858.832-1.489 0-.63-.329-1.177-.832-1.489l-3.337-2.772zm0 17.3l-7.737-5.6-5.848 5.856 7.737 5.6c.503.312 1.091.278 1.511-.106l3.337-2.772c.503-.312.832-.858.832-1.489 0-.63-.329-1.177-.832-1.489z" />
  </svg>
);

interface SocialMediaLink {
  name: string;
  url: string;
  icon: JSX.Element;
  color: string;
}

interface FollowUsOnSocialMediaProps {
  title?: string;
  variant?: "icons-only" | "with-labels";
  size?: "sm" | "md" | "lg";
}

export default function FollowUsOnSocialMedia({
  title = "Follow Us on Social Media",
  variant = "icons-only",
  size = "md",
}: FollowUsOnSocialMediaProps) {
  // Get URLs from environment variables
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL
    ? `https://${process.env.NEXT_PUBLIC_YOUTUBE_URL}`
    : "";
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL
    ? `https://${process.env.NEXT_PUBLIC_LINKEDIN_URL}`
    : "";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL
    ? `https://${process.env.NEXT_PUBLIC_FACEBOOK_URL}`
    : "";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL
    ? `https://${process.env.NEXT_PUBLIC_INSTAGRAM_URL}`
    : "";
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL
    ? `https://${process.env.NEXT_PUBLIC_WHATSAPP_URL}`
    : "";
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL
    ? `https://${process.env.NEXT_PUBLIC_PLAY_STORE_URL}`
    : "";

  const socialMediaLinks: SocialMediaLink[] = [
    {
      name: "YouTube",
      url: youtubeUrl,
      icon: <YouTubeIcon />,
      color: "from-red-600 to-red-500",
    },
    {
      name: "LinkedIn",
      url: linkedinUrl,
      icon: <LinkedInIcon />,
      color: "from-blue-700 to-blue-600",
    },
    {
      name: "Facebook",
      url: facebookUrl,
      icon: <FacebookIcon />,
      color: "from-blue-600 to-blue-500",
    },
    {
      name: "Instagram",
      url: instagramUrl,
      icon: <InstagramIcon />,
      color: "from-pink-600 to-purple-600",
    },
    {
      name: "WhatsApp",
      url: whatsappUrl,
      icon: <WhatsAppIcon />,
      color: "from-green-600 to-green-500",
    },
    {
      name: "Play Store",
      url: playStoreUrl,
      icon: <PlayStoreIcon />,
      color: "from-blue-500 to-teal-500",
    },
  ];

  // Filter out empty URLs
  const validLinks = socialMediaLinks.filter((link) => link.url);

  // Size classes
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const labelClasses = {
    sm: "text-xs mt-2",
    md: "text-sm mt-2",
    lg: "text-base mt-3",
  };

  return (
    <div className="w-full">
      {/* Title */}
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {title}
        </h2>
      )}

      {/* Social Media Icons */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {validLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Follow us on ${link.name}`}
            aria-label={`Follow us on ${link.name}`}
            className="group relative flex flex-col items-center"
          >
            {/* Icon */}
            <div
              className={`${sizeClasses[size]} bg-gradient-to-br ${link.color} text-white rounded-full p-2.5 transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
            >
              {link.icon}
            </div>

            {/* Label */}
            {variant === "with-labels" && (
              <span
                className={`${labelClasses[size]} font-semibold text-gray-700 dark:text-gray-300 text-center transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400`}
              >
                {link.name}
              </span>
            )}

            {/* Tooltip on hover (icons-only mode) */}
            {variant === "icons-only" && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {link.name}
              </div>
            )}
          </a>
        ))}
      </div>

      {/* Fallback if no links are available */}
      {validLinks.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Social media links are not configured yet.
        </p>
      )}
    </div>
  );
}
