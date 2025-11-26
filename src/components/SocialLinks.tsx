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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.71.88-.131.149-.261.168-.486.056-.224-.112-.953-.351-1.815-1.12-.673-.6-1.125-1.34-1.257-1.565-.131-.224-.014-.345.098-.457.101-.101.224-.262.336-.393.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.393-.056-.112-.504-1.214-.69-1.663-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008c-.15 0-.393.056-.6.28-.206.225-.785.767-.785 1.871 0 1.104.804 2.171.916 2.32.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.206-.149-.43-.261z"
      fill="#FFF"
    />
    <path
      d="M16.57 14.438c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.71.88-.131.149-.261.168-.486.056-.224-.112-.953-.351-1.815-1.12-.673-.6-1.125-1.34-1.257-1.565-.131-.224-.014-.345.098-.457.101-.101.224-.262.336-.393.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.393-.056-.112-.504-1.214-.69-1.663-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008c-.15 0-.393.056-.6.28-.206.225-.785.767-.785 1.871 0 1.104.804 2.171.916 2.32.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.206-.149-.43-.261z"
      fill="#FFF"
    />
  </svg>
);

interface SocialLink {
  name: string;
  icon: () => JSX.Element;
  color: string;
  url: string;
  label?: string;
}

interface SocialLinksProps {
  links?: SocialLink[];
}

const SOCIAL_MEDIA_LINKS: Omit<SocialLink, "url">[] = [
  {
    name: "YouTube",
    icon: YouTubeIcon,
    color: "from-red-600 to-red-500",
    label: "@quizzydockofficial",
  },
  {
    name: "LinkedIn",
    icon: LinkedInIcon,
    color: "from-blue-700 to-blue-600",
    label: "QuizzyDock",
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    color: "from-blue-600 to-blue-500",
    label: "QuizzyDock",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    color: "from-pink-600 to-purple-600",
    label: "@quizzydockofficial",
  },
  {
    name: "WhatsApp",
    icon: WhatsAppIcon,
    color: "from-green-600 to-green-500",
    label: "QuizzyDock",
  },
];

export default function SocialLinks({ links }: SocialLinksProps) {
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
  const socialMediaLinks: SocialLink[] = SOCIAL_MEDIA_LINKS.map((link) => ({
    ...link,
    url: urlMap[link.name],
  }));

  // Filter out empty URLs
  const validLinks = links || socialMediaLinks.filter((link) => link.url);
  return (
    <>
      <style>{`
        @keyframes slideInLink {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .social-links-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 0.75rem;
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.3);
          transition: all 0.3s ease;
          cursor: pointer;
          animation: slideInLink 0.5s ease-out forwards;
          opacity: 0;
          text-decoration: none;
        }

        .social-link:hover {
          background: rgba(168, 85, 247, 0.2);
          border-color: rgba(168, 85, 247, 0.6);
          transform: translateX(10px);
        }

        .social-icon {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          color: white;
          flex-shrink: 0;
        }

        .social-label {
          color: #ffffff;
          font-family: "Roboto Slab", serif;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
        }

        .social-link:hover .social-label {
          color: #a855f7;
        }
      `}</style>

      <div className="social-links-container">
        {validLinks.map((link, idx) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            style={{ animationDelay: `${idx * 0.1}s` }}
            title={`Follow us on ${link.name}`}
          >
            <div className={`social-icon bg-gradient-to-br ${link.color}`}>
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ padding: "8px" }}
              >
                <link.icon />
              </div>
            </div>
            <span className="social-label">{link.label || link.name}</span>
          </a>
        ))}
      </div>
    </>
  );
}
