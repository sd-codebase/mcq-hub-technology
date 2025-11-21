interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
}

export function validateSocialMediaPresence(content: any): ValidationResult {
  const missingFields: string[] = [];

  // Check hooks - must be non-empty string
  if (!content.hooks || (typeof content.hooks === "string" && content.hooks.trim() === "")) {
    missingFields.push("hooks");
  }

  // Check cta_pack - must be non-empty string
  if (!content.cta_pack || (typeof content.cta_pack === "string" && content.cta_pack.trim() === "")) {
    missingFields.push("cta_pack");
  }

  // Check thumbnail_text - must be non-empty string
  if (!content.thumbnail_text || (typeof content.thumbnail_text === "string" && content.thumbnail_text.trim() === "")) {
    missingFields.push("thumbnail_text");
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}
