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
  testName?: string;
  testType?: string;
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
}: TextareaFieldProps) => {
  const textareaRef = useState<HTMLTextAreaElement | null>(null);

  const applyFormatting = (wrapChar: string) => {
    const textarea = document.querySelector(`textarea[data-field="${fieldName}"]`) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    if (!selectedText) return;

    const formattedText = `${wrapChar}${selectedText}${wrapChar}`;
    const newValue =
      value.substring(0, start) + formattedText + value.substring(end);

    onChange(newValue);

    // Restore selection after state update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + wrapChar.length,
        start + wrapChar.length + selectedText.length
      );
    }, 0);
  };

  return (
    <div className="mt-4 space-y-2">
      <label className="text-xs font-semibold text-gray-600 block">
        Edit {label}:
      </label>
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-2">
          <textarea
            ref={textareaRef as any}
            data-field={fieldName}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={isLoading}
            placeholder={`Enter ${label}...`}
            className="flex-1 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed h-24"
          />
          <div className="flex gap-2">
            <button
              onClick={() => applyFormatting("#")}
              disabled={isLoading || !value}
              className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              title="Wrap selected text with # (Apply BG)"
            >
              # Apply BG
            </button>
            <button
              onClick={() => applyFormatting("*")}
              disabled={isLoading || !value}
              className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              title="Wrap selected text with * (Bold)"
            >
              * Bold
            </button>
          </div>
        </div>
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
  );
});

TextareaField.displayName = "TextareaField";

export default function ArraySelectionStep({
  jsonData,
  onConfirm,
  isLoading,
  testName,
  testType,
}: ArraySelectionStepProps) {
  // Calculate index based on testName (Part 1, Part 2, etc.)
  const getDefaultIndex = () => {
    if (!testName) return 0;
    const partMatch = testName.match(/Part\s+(\d+)/i);
    if (partMatch) {
      const partNumber = parseInt(partMatch[1], 10);
      return Math.max(0, partNumber - 1); // Part 1 -> 0, Part 2 -> 1, etc.
    }
    return 0;
  };

  // For OUTPUT, get the reverse index from the end of arrays
  const getDefaultIndexForOutput = (array: any[]) => {
    if (!testName) return array.length - 1;
    const partMatch = testName.match(/Part\s+(\d+)/i);
    if (partMatch) {
      const partNumber = parseInt(partMatch[1], 10);
      // For OUTPUT: Part 1 -> last, Part 2 -> second last, etc.
      const reverseIndex = array.length - partNumber;
      return Math.max(0, reverseIndex); // Don't go below 0
    }
    return array.length - 1;
  };

  const defaultIndex = getDefaultIndex();
  const isOutputType = testType?.toLowerCase() === "output";

  const defaultThumbnail = isOutputType
    ? jsonData.thumbnail_text[getDefaultIndexForOutput(jsonData.thumbnail_text)] || jsonData.thumbnail_text[0] || ""
    : jsonData.thumbnail_text[defaultIndex] || jsonData.thumbnail_text[0] || "";

  const defaultHook = isOutputType
    ? jsonData.hooks[getDefaultIndexForOutput(jsonData.hooks)] || jsonData.hooks[0] || ""
    : jsonData.hooks[defaultIndex] || jsonData.hooks[0] || "";

  const defaultCta = isOutputType
    ? jsonData.cta_pack[getDefaultIndexForOutput(jsonData.cta_pack)] || jsonData.cta_pack[0] || ""
    : jsonData.cta_pack[defaultIndex] || jsonData.cta_pack[0] || "";

  const [selectedThumbnail, setSelectedThumbnail] = useState<string>(defaultThumbnail);
  const [selectedHook, setSelectedHook] = useState<string>(defaultHook);
  const [selectedCta, setSelectedCta] = useState<string>(defaultCta);

  // Textarea state for editable content
  const [thumbnailTextarea, setThumbnailTextarea] = useState<string>(defaultThumbnail);
  const [hookTextarea, setHookTextarea] = useState<string>(defaultHook);
  const [ctaTextarea, setCtaTextarea] = useState<string>(defaultCta);

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
        ...(testName && { testName }),
        ...(testType && { testType }),
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
