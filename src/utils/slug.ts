/**
 * Convert a string to a URL-friendly slug
 * @param text - Text to convert (e.g., "JavaScript Advanced")
 * @returns URL-friendly slug (e.g., "javascript-advanced")
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]/g, "") // Remove special characters
    .replace(/\-+/g, "-"); // Replace multiple hyphens with single hyphen
}

/**
 * Build a review URL with SEO-friendly slugs
 * @param testId - MongoDB test ID
 * @param subjectName - Name of the subject
 * @param topicName - Name of the topic
 * @param subtopicName - Name of the subtopic
 * @returns Full review URL path
 */
export function buildReviewUrl(
  testId: string,
  subjectName: string,
  topicName: string,
  subtopicName: string
): string {
  const subjectSlug = toSlug(subjectName);
  const topicSlug = toSlug(topicName);
  const subtopicSlug = toSlug(subtopicName);

  return `/review/${testId}/${subjectSlug}/${topicSlug}/${subtopicSlug}`;
}
