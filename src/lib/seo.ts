import { Metadata } from "next";

// Site configuration
export const SITE_CONFIG = {
  name: "Quizzy Dock Tech Skills",
  shortName: "Quizzy Dock",
  description:
    "Master coding skills with interactive quizzes. Practice MCQs, code output, and interview questions for JavaScript, TypeScript, React, Node.js, and more on Quizzy Dock.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://www.quizzydock.com",
  ogImage: "/images/og-image.png", // Default OpenGraph image
  keywords: [
    "coding quiz",
    "programming tests",
    "interview preparation",
    "MCQ tests",
    "JavaScript quiz",
    "TypeScript quiz",
    "React quiz",
    "Node.js quiz",
    "coding interview",
    "technical assessment",
  ],
};

// Base metadata for all pages
export function getBaseMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: SITE_CONFIG.name,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: SITE_CONFIG.keywords,
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      title: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      images: [SITE_CONFIG.ogImage],
    },
    ...overrides,
  };
}

// Generate page metadata
export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image || SITE_CONFIG.ogImage;

  return {
    title,
    description,
    keywords: keywords || SITE_CONFIG.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}

// JSON-LD structured data generators
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    sameAs: [],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/subjects/{search_term_string}/topics`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

export function generateCourseSchema({
  name,
  description,
  provider = SITE_CONFIG.name,
  url,
}: {
  name: string;
  description: string;
  provider?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: SITE_CONFIG.url,
    },
    url: `${SITE_CONFIG.url}${url}`,
    educationalLevel: "Intermediate",
    teaches: name,
  };
}

export function generateQuizSchema({
  name,
  description,
  about,
}: {
  name: string;
  description: string;
  about: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name,
    description,
    about,
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "teaches",
      targetName: about,
    },
  };
}

// Helper to capitalize words
export function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Subject name formatter
export function formatSubjectName(subject: string): string {
  const subjectMap: { [key: string]: string } = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    nodejs: "Node.js",
    reactjs: "React.js",
    vuejs: "Vue.js",
    html: "HTML",
    css: "CSS",
    sass: "Sass",
    angular: "Angular",
  };

  return subjectMap[subject.toLowerCase()] || capitalizeWords(subject);
}
