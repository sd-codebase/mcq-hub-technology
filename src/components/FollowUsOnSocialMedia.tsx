"use client";

import React, { JSX } from "react";
import Image from "next/image";

// Icon Components
const YouTubeIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 0H4C1.791 0 0 1.791 0 4v16c0 2.209 1.791 4 4 4h16c2.209 0 4-1.791 4-4V4c0-2.209-1.791-4-4-4zM8 19H5V9h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.785-1.75 1.75-1.75 1.75.785 1.75 1.75-.785 1.75-1.75 1.75zM19 19h-3v-5c0-1.385-.5-2.326-1.739-2.326-1.018 0-1.607.684-1.871 1.346-.096.234-.121.562-.121.889V19h-3V9h3v1.398c.442-.68 1.236-1.646 3.008-1.646 2.197 0 3.843 1.434 3.843 4.518V19z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
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
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.71.88-.131.149-.261.168-.486.056-.224-.112-.953-.351-1.815-1.12-.673-.6-1.125-1.34-1.257-1.565-.131-.224-.014-.345.098-.457.101-.101.224-.262.336-.393.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.393-.056-.112-.504-1.214-.69-1.663-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008c-.15 0-.393.056-.6.28-.206.225-.785.767-.785 1.871 0 1.104.804 2.171.916 2.32.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.206-.149-.43-.261"
      fill="#FFF"
    />
    <path
      d="M16.57 14.438c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.71.88-.131.149-.261.168-.486.056-.224-.112-.953-.351-1.815-1.12-.673-.6-1.125-1.34-1.257-1.565-.131-.224-.014-.345.098-.457.101-.101.224-.262.336-.393.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.393-.056-.112-.504-1.214-.69-1.663-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008c-.15 0-.393.056-.6.28-.206.225-.785.767-.785 1.871 0 1.104.804 2.171.916 2.32.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.206-.149-.43-.261z"
      fill="#FFF"
    />
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

  const urlMap: { [key: string]: string } = {
    YouTube: youtubeUrl,
    LinkedIn: linkedinUrl,
    Facebook: facebookUrl,
    Instagram: instagramUrl,
    WhatsApp: whatsappUrl,
  };

  // Build social media links with URLs
  const socialMediaLinks: SocialMediaLink[] = SOCIAL_MEDIA_LINKS.map(
    (link) => ({
      ...link,
      url: urlMap[link.name],
    })
  );

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

      {/* Download the App Section */}
      <div className="mt-12 pt-8 ">
        <h3 className="text-lg md:text-xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Download the App
        </h3>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* Play Store */}
          {process.env.NEXT_PUBLIC_PLAY_STORE_URL && (
            <a
              href={`https://${process.env.NEXT_PUBLIC_PLAY_STORE_URL}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Download on Google Play Store"
              aria-label="Download on Google Play Store"
              className="transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/play-store.png"
                alt="Download on Google Play Store"
                width={150}
                height={50}
                className="h-auto w-auto"
              />
            </a>
          )}

          {/* App Store */}
          {process.env.NEXT_PUBLIC_APP_STORE_URL && (
            <a
              href={`https://${process.env.NEXT_PUBLIC_APP_STORE_URL}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Download on Apple App Store"
              aria-label="Download on Apple App Store"
              className="transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/app-store.png"
                alt="Download on Apple App Store"
                width={150}
                height={50}
                className="h-auto w-auto"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
