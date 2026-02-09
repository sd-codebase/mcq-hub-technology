const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL
  ? `https://${process.env.NEXT_PUBLIC_PLAY_STORE_URL}`
  : "";
const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_STORE_URL}`
  : "";

const PlayStoreIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
      fill="currentColor"
    />
  </svg>
);

const AppStoreIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 384 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

interface DownloadAppProps {
  variant?: "inline" | "stacked";
  title?: string;
}

export default function DownloadApp({
  variant = "stacked",
  title,
}: DownloadAppProps) {
  const hasLinks = playStoreUrl || appStoreUrl;

  if (!hasLinks) return null;

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-gray-300">Download App</span>
        {playStoreUrl && (
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 bg-white/5 text-white transition-all hover:bg-white/10 hover:border-indigo-400/50"
          >
            <PlayStoreIcon className="h-5 w-5" />
          </a>
        )}
        {appStoreUrl && (
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 bg-white/5 text-white transition-all hover:bg-white/10 hover:border-indigo-400/50"
          >
            <AppStoreIcon className="h-5 w-5" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg md:text-xl font-bold text-center text-white mb-6">
          {title}
        </h3>
      )}
      <div className="flex gap-4 flex-row flex-wrap justify-center">
        {playStoreUrl && (
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            className="inline-flex items-center gap-3 rounded-xl bg-gray-800 border border-white/10 px-5 py-3 text-white transition-all hover:bg-gray-700 hover:border-indigo-400/50"
          >
            <PlayStoreIcon className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">GET IT ON</span>
              <span className="text-base font-semibold">Google Play</span>
            </div>
          </a>
        )}
        {appStoreUrl && (
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
            className="inline-flex items-center gap-3 rounded-xl bg-gray-800 border border-white/10 px-5 py-3 text-white transition-all hover:bg-gray-700 hover:border-indigo-400/50"
          >
            <AppStoreIcon className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Download on the</span>
              <span className="text-base font-semibold">App Store</span>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
