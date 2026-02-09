import DownloadApp from "./DownloadApp";

interface FollowUsOnSocialMediaProps {
  title?: string;
  variant?: "icons-only" | "with-labels";
  size?: "sm" | "md" | "lg";
}

export default function FollowUsOnSocialMedia({
  title,
}: FollowUsOnSocialMediaProps) {
  return <DownloadApp title={title || "Download the App"} />;
}
