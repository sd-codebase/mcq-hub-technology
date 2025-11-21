interface SocialMediaContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SocialMediaContentModal({
  isOpen,
  onClose,
  children,
}: SocialMediaContentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-2xl font-bold text-white">
            Social Media Content Manager
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
