"use client";

import { useState, useCallback, memo } from "react";
import PreviewModal from "./PreviewModal";

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

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  fieldName: string;
  isLoading?: boolean;
  copiedField: string | null;
  onCopy: (text: string, fieldName: string) => void;
  onPreview: (text: string, fieldName: string) => void;
}

// Memoized TextareaField component to prevent re-renders
const TextareaField = memo(({
  label,
  value,
  onChange,
  fieldName,
  isLoading,
  copiedField,
  onCopy,
  onPreview,
}: TextareaFieldProps) => (
  <div className="mt-4 space-y-2">
    <label className="text-xs font-semibold text-gray-600 block">
      Edit {label}:
    </label>
    <div className="flex gap-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        placeholder={`Enter ${label}...`}
        className="flex-1 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed h-24"
      />
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onCopy(value, fieldName)}
          disabled={isLoading || !value}
          className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          title="Copy to clipboard"
        >
          {copiedField === fieldName ? "✓ Copied!" : "📋 Copy"}
        </button>
        <button
          onClick={() => onPreview(value, fieldName)}
          disabled={isLoading || !value}
          className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          title="Preview text"
        >
          👁️ Preview
        </button>
      </div>
    </div>
  </div>
));

TextareaField.displayName = "TextareaField";

export default function ArraySelectionStep({
  jsonData,
  onConfirm,
  isLoading,
}: ArraySelectionStepProps) {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");
  const [selectedHook, setSelectedHook] = useState<string>("");
  const [selectedCta, setSelectedCta] = useState<string>("");

  // Textarea state for editable content
  const [thumbnailTextarea, setThumbnailTextarea] = useState<string>("");
  const [hookTextarea, setHookTextarea] = useState<string>("");
  const [ctaTextarea, setCtaTextarea] = useState<string>("");

  // Copy feedback state
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Preview modal state
  const [previewField, setPreviewField] = useState<string | null>(null);

  const isAllSelected = selectedThumbnail && selectedHook && selectedCta;

  // Handle radio button selection and populate textarea
  const handleThumbnailSelect = (value: string) => {
    setSelectedThumbnail(value);
    setThumbnailTextarea(value);
  };

  const handleHookSelect = (value: string) => {
    setSelectedHook(value);
    setHookTextarea(value);
  };

  const handleCtaSelect = (value: string) => {
    setSelectedCta(value);
    setCtaTextarea(value);
  };

  // Copy to clipboard with useCallback
  const handleCopy = useCallback((text: string, fieldName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    });
  }, []);

  // Open preview modal with useCallback
  const handlePreview = useCallback((text: string, fieldName: string) => {
    setPreviewField(fieldName);
  }, []);

  const handleConfirm = () => {
    if (isAllSelected) {
      onConfirm({
        thumbnail_text: thumbnailTextarea,
        hooks: hookTextarea,
        cta_pack: ctaTextarea,
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
                onChange={(e) => handleThumbnailSelect(e.target.value)}
                disabled={isLoading}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
        <TextareaField
          label="Thumbnail Text"
          value={thumbnailTextarea}
          onChange={setThumbnailTextarea}
          fieldName="thumbnail"
          isLoading={isLoading}
          copiedField={copiedField}
          onCopy={handleCopy}
          onPreview={handlePreview}
        />
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
                onChange={(e) => handleHookSelect(e.target.value)}
                disabled={isLoading}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
        <TextareaField
          label="Hooks"
          value={hookTextarea}
          onChange={setHookTextarea}
          fieldName="hook"
          isLoading={isLoading}
          copiedField={copiedField}
          onCopy={handleCopy}
          onPreview={handlePreview}
        />
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
                onChange={(e) => handleCtaSelect(e.target.value)}
                disabled={isLoading}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
        <TextareaField
          label="CTA Pack"
          value={ctaTextarea}
          onChange={setCtaTextarea}
          fieldName="cta"
          isLoading={isLoading}
          copiedField={copiedField}
          onCopy={handleCopy}
          onPreview={handlePreview}
        />
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

      {/* Preview Modal */}
      <PreviewModal
        isOpen={!!previewField}
        onClose={() => setPreviewField(null)}
        text={
          previewField === "thumbnail"
            ? thumbnailTextarea
            : previewField === "hook"
              ? hookTextarea
              : ctaTextarea
        }
        type={
          previewField === "thumbnail"
            ? "thumbnail"
            : previewField === "hook"
              ? "hook"
              : "cta"
        }
      />
    </div>
  );
}
