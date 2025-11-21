"use client";

import { useState } from "react";

interface ArraySelectionStepProps {
  jsonData: {
    thumbnail_text: string[];
    hooks: string[];
    cta_pack: string[];
    [key: string]: any;
  };
  onConfirm: (selections: {
    thumbnail_text: string;
    hooks: string;
    cta_pack: string;
  }) => void;
  isLoading?: boolean;
}

export default function ArraySelectionStep({
  jsonData,
  onConfirm,
  isLoading,
}: ArraySelectionStepProps) {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");
  const [selectedHook, setSelectedHook] = useState<string>("");
  const [selectedCta, setSelectedCta] = useState<string>("");

  const isAllSelected = selectedThumbnail && selectedHook && selectedCta;

  const handleConfirm = () => {
    if (isAllSelected) {
      onConfirm({
        thumbnail_text: selectedThumbnail,
        hooks: selectedHook,
        cta_pack: selectedCta,
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-4 rounded-lg bg-blue-50 border-l-4 border-blue-500">
        <p className="text-blue-700 font-semibold text-sm">
          📋 Select one option from each field below:
        </p>
      </div>

      {/* Thumbnail Text Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700 block">
          Thumbnail Text
        </label>
        <div className="space-y-2">
          {jsonData.thumbnail_text.map((item, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="thumbnail_text"
                value={item}
                checked={selectedThumbnail === item}
                onChange={(e) => setSelectedThumbnail(e.target.value)}
                disabled={isLoading}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Hooks Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700 block">
          Hooks
        </label>
        <div className="space-y-2">
          {jsonData.hooks.map((item, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="hooks"
                value={item}
                checked={selectedHook === item}
                onChange={(e) => setSelectedHook(e.target.value)}
                disabled={isLoading}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* CTA Pack Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700 block">
          CTA Pack
        </label>
        <div className="space-y-2">
          {jsonData.cta_pack.map((item, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="cta_pack"
                value={item}
                checked={selectedCta === item}
                onChange={(e) => setSelectedCta(e.target.value)}
                disabled={isLoading}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleConfirm}
          disabled={isLoading || !isAllSelected}
          className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⏳</span> Saving...
            </>
          ) : (
            <>✓ Confirm & Save</>
          )}
        </button>
      </div>
    </div>
  );
}
