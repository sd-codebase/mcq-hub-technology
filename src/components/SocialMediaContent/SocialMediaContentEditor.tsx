"use client";

import { useState } from "react";
import SocialMediaContentModal from "./SocialMediaContentModal";
import JSONEditor from "./JSONEditor";
import ValidationResult from "./ValidationResult";
import ArraySelectionStep from "./ArraySelectionStep";
import { validateSocialMediaContent } from "@/utils/validateSocialMediaContent";

interface SocialMediaContentEditorProps {
  isOpen: boolean;
  onClose: () => void;
  testId: string;
  testName?: string;
  testType?: string;
  onSuccess?: () => void;
}

export default function SocialMediaContentEditor({
  isOpen,
  onClose,
  testId,
  testName,
  testType,
  onSuccess,
}: SocialMediaContentEditorProps) {
  const [step, setStep] = useState<"paste" | "select">("paste");
  const [jsonInput, setJsonInput] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
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

    // If valid, parse and move to selection step
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedData(parsed);
      setStep("select");
    } catch (error) {
      setValidationResult({
        isValid: false,
        errors: ["Failed to parse JSON"],
        missingFields: [],
      });
    }
  };

  const handleConfirmAndSave = async (selections: {
    thumbnail_text: string;
    hooks: string;
    cta_pack: string;
    testName?: string;
    testType?: string;
  }) => {
    try {
      setIsSaving(true);

      // Convert arrays to strings and create final object
      const finalData = {
        ...parsedData,
        thumbnail_text: selections.thumbnail_text,
        hooks: selections.hooks,
        cta_pack: selections.cta_pack,
      };

      const response = await fetch(
        `/api/tests/${testId}/social-media-content`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ socialMediaContent: finalData }),
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
      setParsedData(null);
      setStep("paste");
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

  const handleBackToPaste = () => {
    setStep("paste");
    setParsedData(null);
    setValidationResult(null);
  };

  return (
    <SocialMediaContentModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        {step === "paste" ? (
          <>
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
                    <span className="animate-spin">⏳</span> Validating...
                  </>
                ) : (
                  <>💾 Save</>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Selection Step */}
            <ArraySelectionStep
              jsonData={parsedData}
              onConfirm={handleConfirmAndSave}
              isLoading={isSaving}
              testName={testName}
              testType={testType}
            />

            {/* Validation Result - show if there are errors */}
            {validationResult && !validationResult.isValid && (
              <ValidationResult
                isValid={false}
                errors={validationResult.errors}
                missingFields={validationResult.missingFields}
              />
            )}

            {/* Back Button */}
            <div className="flex gap-3 justify-between pt-4">
              <button
                onClick={handleBackToPaste}
                disabled={isSaving}
                className="px-6 py-2 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Back to Paste
              </button>
            </div>
          </>
        )}
      </div>
    </SocialMediaContentModal>
  );
}
