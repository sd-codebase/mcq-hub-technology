interface SocialMediaContentButtonProps {
  onClick: () => void;
}

export default function SocialMediaContentButton({
  onClick,
}: SocialMediaContentButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-8 py-4 rounded-full font-bold text-white text-lg
                 bg-gradient-to-r from-pink-600 to-rose-600
                 hover:from-pink-700 hover:to-rose-700
                 transition-all duration-300 shadow-lg shadow-pink-500/50
                 transform hover:scale-105"
    >
      📱 Social Media Content
    </button>
  );
}
