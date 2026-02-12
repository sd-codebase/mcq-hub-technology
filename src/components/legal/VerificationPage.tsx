"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ProofImage {
  compressed: string;
  full: string;
  alt: string;
  label: string;
}

const PROOF_IMAGES: ProofImage[] = [
  {
    compressed: "/verification/hostinger-dashboard.jpg",
    full: "/verification/hostinger-dashboard.png",
    alt: "Hostinger dashboard showing quizzydock.com domain ownership",
    label: "Hostinger Dashboard — Domain Ownership",
  },
  {
    compressed: "/verification/play-console.jpg",
    full: "/verification/play-console.png",
    alt: "Google Play Console showing QuizzyDock app listing",
    label: "Google Play Console — App Listing",
  },
  {
    compressed: "/verification/playstore-listing.jpg",
    full: "/verification/playstore-listing.png",
    alt: "Google Play Store listing for QuizzyDock app",
    label: "Google Play Store — App Listing",
  },
  {
    compressed: "/verification/vercel-dashboard.jpg",
    full: "/verification/vercel-dashboard.png",
    alt: "Vercel dashboard showing quizzydock.com domain mapping and deployment",
    label: "Vercel Dashboard — Domain Mapping & Deployment",
  },
  {
    compressed: "/verification/youtube-dashboard.jpg",
    full: "/verification/youtube-dashboard.png",
    alt: "YouTube Studio dashboard showing QuizzyDock channel ownership",
    label: "YouTube Studio — Channel Dashboard",
  },
  {
    compressed: "/verification/facebook-dashboard.jpg",
    full: "/verification/facebook-dashboard.png",
    alt: "Facebook page dashboard showing QuizzyDock page ownership",
    label: "Facebook — Page Dashboard",
  },
  {
    compressed: "/verification/instagram-dashboard.jpg",
    full: "/verification/instagram-dashboard.png",
    alt: "Instagram dashboard showing QuizzyDock account ownership",
    label: "Instagram — Account Dashboard",
  },
  {
    compressed: "/verification/linkedin-dashboard.jpg",
    full: "/verification/linkedin-dashboard.png",
    alt: "LinkedIn dashboard showing QuizzyDock profile ownership",
    label: "LinkedIn — Profile Dashboard",
  },
];

function useProgressiveImage(compressed: string, full: string) {
  const [src, setSrc] = useState(compressed);

  useEffect(() => {
    const img = new window.Image();
    img.src = full;
    img.onload = () => setSrc(full);
  }, [full]);

  return src;
}

function ProofScreenshot({
  image,
  onZoom,
}: {
  image: ProofImage;
  onZoom: (src: string, alt: string) => void;
}) {
  const src = useProgressiveImage(image.compressed, image.full);

  return (
    <div>
      <p className="text-sm text-gray-400 mb-2">{image.label}</p>
      <Image
        src={src}
        alt={image.alt}
        width={800}
        height={457}
        className="rounded-lg border border-gray-700 w-full h-auto cursor-pointer hover:opacity-90 transition duration-150"
        onClick={() => onZoom(image.full, image.alt)}
      />
    </div>
  );
}

export const VerificationPage = () => {
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <section>
      <h1 className="text-4xl font-bold text-white mb-8">
        QuizzyDock — Verification Page
      </h1>
      <div className="space-y-6 text-gray-300">
        {/* Ownership Verification Statement */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Ownership Verification Statement
          </h2>
          <p>
            This page serves to verify the ownership of QuizzyDock for the Apple
            App Store Review team.
          </p>
        </section>

        {/* Apple Developer Account Details */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Apple Developer Account Details
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Developer Name: <span className="font-bold">Krishna Suryavanshi</span>
            </li>
            <li>
              Team ID: <span className="font-bold">DN3DWWT5CQ</span>
            </li>
            <li>
              Developer ID:{" "}
              <span className="font-bold">a96ef64f-25be-44a8-835a-05a11875cff3</span>
            </li>
            <li>
              Roles: <span className="font-bold">Account Holder, Admin</span>
            </li>
            <li>
              Bundle ID:{" "}
              <span className="font-bold">com.krishna.jsleet.quizzydock</span>
            </li>
            <li>
              Account Email:{" "}
              <a
                href="mailto:krishna.dhas021815@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                krishna.dhas021815@gmail.com
              </a>
            </li>
            <li>
              Privacy Policy:{" "}
              <a
                href="https://www.quizzydock.com/privacy-policies/quizzydock-app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                quizzydock.com/privacy-policies/quizzydock-app
              </a>
            </li>
          </ul>
        </section>

        {/* Google Play Developer Details */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Google Play Developer Details
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Organization: <span className="font-bold">KS Labs Edu.</span>
            </li>
            <li>
              Developer Name: <span className="font-bold">Krishna Suryavanshi</span>
            </li>
            <li>
              Package Name:{" "}
              <span className="font-bold">com.krishna.jsleet.quizzydock</span>
            </li>
            <li>
              Account Email:{" "}
              <a
                href="mailto:krishna.dhas021815@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                krishna.dhas021815@gmail.com
              </a>
            </li>
            <li>
              Support Email:{" "}
              <a
                href="mailto:krishna.dhas021815@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                krishna.dhas021815@gmail.com
              </a>
            </li>
            <li>
              Developer Name (Public):{" "}
              <span className="font-bold">Krishna Jayram Suryavanshi</span>
            </li>
            <li>
              Developer Email (Public):{" "}
              <a
                href="mailto:krishna.jsleet@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                krishna.jsleet@gmail.com
              </a>
            </li>
            <li>
              Country: <span className="font-bold">India</span>
            </li>
            <li>
              Privacy Policy:{" "}
              <a
                href="https://www.quizzydock.com/privacy-policies/quizzydock-app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                quizzydock.com/privacy-policies/quizzydock-app
              </a>
            </li>
          </ul>
        </section>

        {/* Cross-Linking & Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Cross-Linking &amp; Contact
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Administrative Email:{" "}
              <a
                href="mailto:krishna.jsleet@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                krishna.jsleet@gmail.com
              </a>
            </li>
            <li>
              General Contact Email:{" "}
              <a
                href="mailto:quizzydock@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                quizzydock@gmail.com
              </a>
            </li>
            <li>
              Personal Email:{" "}
              <a
                href="mailto:krishna.dhas021815@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                krishna.dhas021815@gmail.com
              </a>
            </li>
            <li>
              Contact Number:{" "}
              <a
                href="tel:+917722036122"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                +91 7722036122
              </a>
            </li>
            <li>
              Website:{" "}
              <a
                href="https://www.quizzydock.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                www.quizzydock.com
              </a>
            </li>
            <li>
              Google Play Store Listing:{" "}
              <a
                href="https://play.google.com/store/apps/details?id=com.krishna.jsleet.quizzydock"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                QuizzyDock on Google Play
              </a>
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-indigo-400 mt-6 mb-3">
            Social Media
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              YouTube:{" "}
              <a
                href="https://www.youtube.com/@quizzydockofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                youtube.com/@quizzydockofficial
              </a>
            </li>
            <li>
              Facebook:{" "}
              <a
                href="https://www.facebook.com/people/Quizzy-Dock/61583950234953/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                facebook.com/Quizzy-Dock
              </a>
            </li>
            <li>
              Instagram:{" "}
              <a
                href="https://www.instagram.com/quizzydockofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                instagram.com/quizzydockofficial
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/quizzydock/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition duration-150"
              >
                linkedin.com/in/quizzydock
              </a>
            </li>
          </ul>
        </section>

        {/* Visual Proof (Screenshots) */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Visual Proof
          </h2>
          <p className="mb-4">
            The following screenshots verify domain ownership and app
            publishing credentials. Click to zoom.
          </p>
          <div className="space-y-6">
            {PROOF_IMAGES.map((image) => (
              <ProofScreenshot
                key={image.compressed}
                image={image}
                onZoom={(src, alt) => setModalImage({ src, alt })}
              />
            ))}
          </div>
        </section>

        {/* Technical Note */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Technical Note
          </h2>
          <p>
            The &ldquo;Taking Test&rdquo; feature has been disabled on the web
            version to prioritize the iOS app experience.
          </p>
        </section>
      </div>

      {/* Zoom Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setModalImage(null)}
        >
          <div className="relative" style={{ transform: "scale(2)" }}>
            <Image
              src={modalImage.src}
              alt={modalImage.alt}
              width={800}
              height={457}
              className="rounded-lg"
              unoptimized
            />
          </div>
        </div>
      )}
    </section>
  );
};
