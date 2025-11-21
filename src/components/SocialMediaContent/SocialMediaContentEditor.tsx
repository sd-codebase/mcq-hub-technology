"use client";

import { useState } from "react";
import SocialMediaContentModal from "./SocialMediaContentModal";
import JSONEditor from "./JSONEditor";
import ValidationResult from "./ValidationResult";
import { validateSocialMediaContent } from "@/utils/validateSocialMediaContent";

interface SocialMediaContentEditorProps {
  isOpen: boolean;
  onClose: () => void;
  testId: string;
  onSuccess?: () => void;
}

export default function SocialMediaContentEditor({
  isOpen,
  onClose,
  testId,
  onSuccess,
}: SocialMediaContentEditorProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errors: string[];
    missingFields: string[];
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setValidationResult(null);

    // Validate JSON
    if (!jsonInput.trim()) {
      setValidationResult({
        isValid: false,
        errors: ["Please enter JSON content"],
        missingFields: [],
      });
      return;
    }

    const validation = validateSocialMediaContent(jsonInput);

    if (!validation.isValid) {
      setValidationResult(validation);
      return;
    }

    // If valid, save to API
    try {
      setIsSaving(true);

      const socialMediaContent = JSON.parse(jsonInput);

      const response = await fetch(
        `/api/tests/${testId}/social-media-content`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ socialMediaContent }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        setValidationResult({
          isValid: false,
          errors: [data.message || "Failed to save social media content"],
          missingFields: [],
        });
        return;
      }

      // Success
      setValidationResult(null);
      setJsonInput("");
      onSuccess?.();
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error saving social media content:", error);
      setValidationResult({
        isValid: false,
        errors: ["Failed to save. Please try again."],
        missingFields: [],
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SocialMediaContentModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        {/* JSON Editor */}
        <JSONEditor
          value={jsonInput}
          onChange={setJsonInput}
          isLoading={isSaving}
        />

        {/* Validation Result - only show if there are errors */}
        {validationResult && !validationResult.isValid && (
          <ValidationResult
            isValid={false}
            errors={validationResult.errors}
            missingFields={validationResult.missingFields}
          />
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving || !jsonInput.trim()}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <span className="animate-spin">⏳</span> Saving...
              </>
            ) : (
              <>💾 Save</>
            )}
          </button>
        </div>
      </div>
    </SocialMediaContentModal>
  );
}
