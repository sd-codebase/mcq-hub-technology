"use client";

import React, { JSX } from "react";

// Icon Components
const YouTubeIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2.3-3 3.5-5.83 5" />
    <path d="M12 17v.01" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20 0H4C1.791 0 0 1.791 0 4v16c0 2.209 1.791 4 4 4h16c2.209 0 4-1.791 4-4V4c0-2.209-1.791-4-4-4zM8 19H5V9h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.785-1.75 1.75-1.75 1.75.785 1.75 1.75-.785 1.75-1.75 1.75zM19 19h-3v-5c0-1.385-.5-2.326-1.739-2.326-1.018 0-1.607.684-1.871 1.346-.096.234-.121.562-.121.889V19h-3V9h3v1.398c.442-.68 1.236-1.646 3.008-1.646 2.197 0 3.843 1.434 3.843 4.518V19z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <circle cx="17.5" cy="6.5" r="1.5" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a8.06 8.06 0 00-4.255 1.111l-.305.175-3.158-.829.844 3.051.194.309a8.007 8.007 0 001.232 4.038l.276.398 4.572.224c.51 0 1.021-.035 1.529-.104l.43-.047 3.158.829-.844-3.051-.194-.31a8.007 8.007 0 00-1.232-4.038l-.276-.398-4.572-.224m5.421 7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
  </svg>
);

const PlayStoreIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M3.609 1.814L13.792 12 3.609 22.186A.996.996 0 0 1 3 21.814V2.186c0-.35.189-.673.609-.372zm16.168.536c-.42-.384-1.008-.418-1.511-.106l-7.737 5.6 5.848 5.856 7.737-5.6c.503-.312.832-.858.832-1.489 0-.63-.329-1.177-.832-1.489l-3.337-2.772zm0 17.3l-7.737-5.6-5.848 5.856 7.737 5.6c.503.312 1.091.278 1.511-.106l3.337-2.772c.503-.312.832-.858.832-1.489 0-.63-.329-1.177-.832-1.489z" />
  </svg>
);

interface SocialMediaLink {
  name: string;
  url: string;
  icon: () => JSX.Element;
  color: string;
}

interface FollowUsOnSocialMediaProps {
  title?: string;
  variant?: "icons-only" | "with-labels";
  size?: "sm" | "md" | "lg";
}

const SOCIAL_MEDIA_LINKS: Omit<SocialMediaLink, "url">[] = [
  {
    name: "YouTube",
    icon: YouTubeIcon,
    color: "from-red-600 to-red-500",
  },
  {
    name: "LinkedIn",
    icon: LinkedInIcon,
    color: "from-blue-700 to-blue-600",
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    color: "from-blue-600 to-blue-500",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    color: "from-pink-600 to-purple-600",
  },
  {
    name: "WhatsApp",
    icon: WhatsAppIcon,
    color: "from-green-600 to-green-500",
  },
  {
    name: "Play Store",
    icon: PlayStoreIcon,
    color: "from-blue-500 to-teal-500",
  },
];

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

  const urlMap: { [key: string]: string } = {
    YouTube: youtubeUrl,
    LinkedIn: linkedinUrl,
    Facebook: facebookUrl,
    Instagram: instagramUrl,
    WhatsApp: whatsappUrl,
    "Play Store": playStoreUrl,
  };

  // Build social media links with URLs
  const socialMediaLinks: SocialMediaLink[] = SOCIAL_MEDIA_LINKS.map((link) => ({
    ...link,
    url: urlMap[link.name],
  }));

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
              className={`${sizeClasses[size]} bg-gradient-to-br ${link.color} text-white rounded-full p-2.5 transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex items-center justify-center`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <link.icon />
              </div>
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
