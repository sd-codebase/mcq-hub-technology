interface ValidationResult {
  isValid: boolean;
  errors: string[];
  missingFields: string[];
}

function isNonEmptyArray(arr: any): arr is string[] {
  return Array.isArray(arr) && arr.length > 0 && arr.every(item => typeof item === "string" && item.trim() !== "");
}

function isNonEmptyString(str: any): str is string {
  return typeof str === "string" && str.trim() !== "";
}

export function validateSocialMediaContent(jsonString: string): ValidationResult {
  const errors: string[] = [];
  const missingFields: string[] = [];

  // Parse JSON
  let data: any;
  try {
    data = JSON.parse(jsonString);
  } catch (error) {
    return {
      isValid: false,
      errors: ["Invalid JSON format. Please check your JSON syntax."],
      missingFields: [],
    };
  }

  // Check if data is an object
  if (typeof data !== "object" || data === null) {
    return {
      isValid: false,
      errors: ["JSON must be an object"],
      missingFields: [],
    };
  }

  // Strict validation: all fields are required and must have values

  // 1. thumbnail_text - array of non-empty strings
  if (!isNonEmptyArray(data.thumbnail_text)) {
    missingFields.push("thumbnail_text");
    errors.push("thumbnail_text must be a non-empty array of strings");
  }

  // 2. hooks - array of non-empty strings
  if (!isNonEmptyArray(data.hooks)) {
    missingFields.push("hooks");
    errors.push("hooks must be a non-empty array of strings");
  }

  // 3. instagram_reel_caption - non-empty string
  if (!isNonEmptyString(data.instagram_reel_caption)) {
    missingFields.push("instagram_reel_caption");
    errors.push("instagram_reel_caption must be a non-empty string");
  }

  // 4. facebook_reel_caption - non-empty string
  if (!isNonEmptyString(data.facebook_reel_caption)) {
    missingFields.push("facebook_reel_caption");
    errors.push("facebook_reel_caption must be a non-empty string");
  }

  // 5. youtube_shorts - object with title, description, and hashtags
  if (!data.youtube_shorts || typeof data.youtube_shorts !== "object") {
    missingFields.push("youtube_shorts");
    errors.push("youtube_shorts must be an object");
  } else {
    if (!isNonEmptyString(data.youtube_shorts.title)) {
      missingFields.push("youtube_shorts.title");
      errors.push("youtube_shorts.title must be a non-empty string");
    }
    if (!isNonEmptyString(data.youtube_shorts.description)) {
      missingFields.push("youtube_shorts.description");
      errors.push("youtube_shorts.description must be a non-empty string");
    }
    if (!isNonEmptyArray(data.youtube_shorts.hashtags)) {
      missingFields.push("youtube_shorts.hashtags");
      errors.push("youtube_shorts.hashtags must be a non-empty array of strings");
    }
  }

  // 6. linkedin_caption - non-empty string
  if (!isNonEmptyString(data.linkedin_caption)) {
    missingFields.push("linkedin_caption");
    errors.push("linkedin_caption must be a non-empty string");
  }

  // 7. whatsapp_channel_post - non-empty string
  if (!isNonEmptyString(data.whatsapp_channel_post)) {
    missingFields.push("whatsapp_channel_post");
    errors.push("whatsapp_channel_post must be a non-empty string");
  }

  // 8. cta_pack - array of non-empty strings
  if (!isNonEmptyArray(data.cta_pack)) {
    missingFields.push("cta_pack");
    errors.push("cta_pack must be a non-empty array of strings");
  }

  return {
    isValid: errors.length === 0,
    errors,
    missingFields: [...new Set(missingFields)], // Remove duplicates
  };
}

export function getTemplateJSON(): string {
  return JSON.stringify(
    {
      thumbnail_text: ["Add your thumbnail text"],
      hooks: ["Add your hooks"],
      instagram_reel_caption: "Add Instagram caption",
      facebook_reel_caption: "Add Facebook caption",
      youtube_shorts: {
        title: "Add YouTube Shorts title",
        description: "Add YouTube Shorts description",
        hashtags: ["#hashtag1", "#hashtag2"],
      },
      linkedin_caption: "Add LinkedIn caption",
      whatsapp_channel_post: "Add WhatsApp channel post",
      cta_pack: ["Add CTA 1", "Add CTA 2"],
    },
    null,
    2
  );
}
