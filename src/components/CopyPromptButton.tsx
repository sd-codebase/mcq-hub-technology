"use client";

import React, { useState } from "react";

type QuestionType = "mcq" | "output" | "interview";

const PROMPTS: Record<QuestionType, string> = {
  mcq: `
Generate {count} multiple-choice questions (MCQ) for the following context:
**Subject:** {subject_name}
**Chapter:** {chapter_name}
**Topic:** {topic_name}
**Programming Language/Technology:** {language}

Requirements:

1. Generate exactly {count} questions
2. Each question must have exactly 4 options
3. Specify the correct answer as an index (0-3)
4. Use proper markdown formatting in explanations
5. Use appropriate code syntax highlighting with language tags (\`\`\`{language.lower()})
6. Make questions practical and educational
7. Explanations should be clear and informative with proper formatting (**bold**, headings, lists)

Return ONLY a valid JSON array with this exact structure:
[
{
    "question": "Question text here?",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correct_answer": 2,
    "explanation": "Markdown formatted explanation with **bold**, headings, and code blocks"
  }
]

Important:

- Use proper markdown in explanations (## headings, **bold**, lists, code blocks)
- correct_answer must be 0, 1, 2, or 3 (zero-indexed)
- Code blocks must use \`\`\`{language.lower()} for syntax highlighting
- Return ONLY the JSON array, no additional text`,

  output: `
Generate {count} code output prediction questions for the following context:

**Subject:** {subject_name}
**Chapter:** {chapter_name}
**Topic:** {topic_name}
**Programming Language/Technology:** {language}

Requirements:

1. Generate exactly {count} questions
2. Each question must contain code with proper syntax highlighting
3. Provide the expected output
4. Include clear explanations with markdown formatting
5. Code blocks must use \`\`\`{language.lower()} for syntax highlighting
6. Output should be in \`\`\` code blocks
7. Make questions practical and test real concepts

Return ONLY a valid JSON array with this exact structure:
[
{
"question": "What is the output of the code snippet? \\n \`\`\`{language.lower()}\\ncode here\\n\`\`\`",
"output": "\`\`\`\\nexpected output\\n\`\`\`",
"explanation": "Markdown formatted explanation with **bold**, headings, and code blocks if needed"
}
]

Important:

- Question field must contain code with \`\`\`{language.lower()} syntax highlighting
- Output field must be in \`\`\` code blocks
- Explanations should include **bold**, headings, and visual representations if helpful
- Return ONLY the JSON array, no additional text`,

  interview: `
Generate {count} interview questions with detailed answers for the following context:

**Subject:** {subject_name}
**Chapter:** {chapter_name}
**Topic:** {topic_name}
**Programming Language/Technology:** {language}

Requirements:

1. Generate exactly {count} questions
2. Questions should be common interview questions
3. Answers must be comprehensive with proper markdown formatting
4. Use ## for main headings, ### for subheadings
5. Use **bold** for important terms
6. Include code examples with \`\`\`{language.lower()} syntax highlighting
7. Use lists, tables, and visual representations where helpful
8. Include practical examples

Return ONLY a valid JSON array with this exact structure:
[
{
"question": "Interview question text?",
"answer": "## Main Heading\\n\\nDetailed answer with **bold**, code blocks, lists, etc.",
"explanation": "**Key points** to remember or additional context with proper formatting"
}
]

Important:

- Answers must be well-structured with ## headings and ### subheadings
- Use **bold** for emphasis on important concepts
- Include code examples with \`\`\`{language.lower()} syntax highlighting
- Use lists and visual representations
- Explanations should highlight key takeaways
- Return ONLY the JSON array, no additional text`,
};

interface CopyPromptButtonProps {
  questionType: QuestionType;
  count?: number;
  subjectName?: string;
  chapterName?: string;
  topicName?: string;
  language?: string;
  onCopied?: () => void;
}

export default function CopyPromptButton({
  questionType,
  count,
  subjectName,
  chapterName,
  topicName,
  language,
  onCopied,
}: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false);

  // Replace placeholders in prompt with actual values
  const replacePlaceholders = (prompt: string): string => {
    let result = prompt;

    if (count !== undefined) {
      result = result.replace(/{count}/g, String(count));
    }
    if (subjectName) {
      result = result.replace(/{subject_name}/g, subjectName);
    }
    if (chapterName) {
      result = result.replace(/{chapter_name}/g, chapterName);
    }
    if (topicName) {
      result = result.replace(/{topic_name}/g, topicName);
    }
    if (language) {
      result = result.replace(/{language}/g, language);
      // Also replace {language.lower()} with lowercase version
      result = result.replace(/{language\.lower\(\)}/g, language.toLowerCase());
    }

    return result;
  };

  const handleCopy = async () => {
    try {
      let prompt = PROMPTS[questionType];

      // Replace placeholders with dynamic data
      prompt = replacePlaceholders(prompt);

      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      onCopied?.();

      // Reset "Copied!" feedback after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy prompt:", error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg"
    >
      {copied ? "✓ Copied!" : "📋 Copy Prompt"}
    </button>
  );
}
