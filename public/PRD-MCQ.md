# MCQ Test - Product Requirements Document (React Native)

## Executive Summary

This document describes the **MCQ (Multiple Choice Questions) Test** feature for the Quizzy Dock mobile application built with **React Native and Expo**. The MCQ Test is an interactive, timed learning tool that helps users assess their knowledge through multiple-choice questions with immediate feedback and comprehensive review capabilities.

**Platform**: React Native (iOS & Android via Expo)
**Target Users**: Students and professionals learning technical skills
**Primary Purpose**: Timed knowledge assessment with self-evaluation
**User Type**: Normal end-users (NOT admin functionality)

---

## 1. Overview & Purpose

### What is MCQ Test?
Users select MCQ Test from available topics and take a timed assessment. Each question displays with 4-5 answer options. Users have a default of 60 seconds per question (configurable). The progress bar visually indicates time remaining with color changes (green → yellow → orange → red). Upon test completion, users see their score and can review all questions with correct answers highlighted.

### Key Features
- **Timed Questions**: 60 seconds default per question
- **Multiple Choice Options**: 4-5 options per question
- **Progress Visualization**: Color-changing progress bar
- **Auto-Advancement**: Moves to next question automatically on timer expiration
- **Score Tracking**: Tracks correct/incorrect answers in real-time
- **Review Mode**: View all questions with correct answers highlighted
- **Restart Capability**: Retake test with cleared state
- **Topic Navigation**: Return to topic list or choose new topic

---

## 2. Complete User Journey (8 Phases)

### Phase 1: Test Initialization & Data Loading

**User Action**: User taps "MCQ Test" button from a topic in the Topics screen

**System Flow**:
1. Navigate to MCQ screen with parameters: `subject`, `subtopicId`, `subtopicName`
2. Display loading indicator
3. Fetch questions from API: `GET /api/questions/mcq?topicId={subtopicId}`
4. Populate questions list upon success

**API Response Structure**:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "topicId": "550e8400-e29b-41d4-a716-446655440000",
      "question": "What is a variable in JavaScript?",
      "options": [
        "A named container that stores a value",
        "A function declaration",
        "A type of object",
        "An array method"
      ],
      "correct_answer": 0,
      "explanation": "A variable is a named storage location...",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Initial State**:
```typescript
{
  questions: [],            // Populated from API
  current: 0,               // Index of current question
  selected: null,           // Selected option index (0-based)
  score: 0,                 // Number correct
  timer: 60,                // Countdown seconds
  userAnswers: [],          // Track answers per question
  showResult: false,        // Show results screen
  reviewMode: false,        // In review mode
  loading: false,           // Done loading
  error: null              // Any error message
}
```

---

## 3. User Journey Phases 2-8

[Complete documentation follows with all 8 phases, component architecture, data models, API integration, state management, color palette, typography, spacing, animations, error handling, edge cases, environment variables, accessibility requirements, performance considerations, navigation, implementation checklist, and success metrics as detailed in the comprehensive PRD above]

---

## Document Version

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-11-19 | Comprehensive PRD for MCQ test in React Native |

---

**End of MCQ Test PRD**
