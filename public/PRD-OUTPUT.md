# Output Test - Product Requirements Document (React Native)

## Executive Summary

This document describes the **Output Test** feature for the Quizzy Dock mobile application built with **React Native and Expo**. The Output Test is an interactive learning tool where users predict code output by typing their answers. Unlike the MCQ Test, there is **NO timer**, making it ideal for testing code comprehension and output prediction skills. Users submit free-form text answers that are validated against expected output through exact string matching.

**Platform**: React Native (iOS & Android via Expo)
**Target Users**: Programmers learning code output prediction
**Primary Purpose**: Code output assessment without time pressure
**User Type**: Normal end-users (NOT admin functionality)

---

## 1. Overview & Purpose

### What is Output Test?
Users select Output Test from available programming topics and answer questions by typing the expected output of code snippets. Each question displays a programming problem or code snippet, and users must type what the code will output. After typing, users click "Check Answer" to see if their answer matches the expected output exactly. The test shows explanations regardless of correctness. Upon completion, users see their score and can restart or choose a new topic.

### Key Features
- **NO Timer**: Unlimited time per question, focus on correctness
- **Text Input**: Free-form text field for typing answers
- **Exact String Matching**: Case-sensitive, whitespace-sensitive validation
- **Immediate Feedback**: Show expected output after checking answer
- **Multiple Attempts**: Users can re-type and re-check their answer
- **Explanation Display**: Show explanation after checking
- **Score Tracking**: Track correct answers throughout test
- **No Review Mode**: Results screen only, no detailed review
- **Simpler Navigation**: Just Restart or Choose New Topic from results

---

## 2. Complete User Journey (5 Phases)

### Phase 1: Test Initialization & Data Loading

**User Action**: User taps "Output Test" button from a topic in the Topics screen

**System Flow**:
1. Navigate to Output test screen with parameters: `subject`, `subtopicId`, `subtopicName`
2. Display loading message: "Loading questions..."
3. Fetch questions from API: `GET /api/questions/output?topicId={subtopicId}`
4. Store questions upon success

**API Response Structure**:
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "topicId": "550e8400-e29b-41d4-a716-446655440000",
      "question": "What will this code output?\n\nconst x = 5;\nconst y = 10;\nconsole.log(x + y);",
      "output": "15",
      "explanation": "The code adds 5 and 10, resulting in 15 printed to console.",
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
  score: 0,                 // Number correct
  userAnswer: "",           // Current text input
  showExplanation: false,   // Show answer after check
  showResult: false,        // Show results screen
  loading: false,           // Done loading
  error: null              // Any error message
}
```

**Key Difference from MCQ**: NO timer state needed

---

### Phase 2: Question Display with Text Input

**What User Sees**:
- **Header Section**:
  - Subtopic: "JavaScript Basics" (center, large, bold)
  - Test Type Badge: "Output Test" (blue badge, left side)
  - Question Counter: "1 / 10" (right side)

- **Question Card**:
  - White background with rounded corners (12 dp radius)
  - Question text: Bold, 18-20 sp, dark color, markdown-rendered
  - Padding: 16 dp
  - Shadow: Subtle elevation
  - Content: May include code blocks, formatting

- **Input Section**:
  - Single text input field (NOT textarea, unless output spans multiple lines)
  - Full width of container
  - Placeholder: "Type the output here..."
  - Border: 2 dp, light gray (#e5e7eb)
  - Padding: 12-16 dp
  - Border-radius: 8 dp
  - Font: 16 sp, dark gray
  - Shadow: subtle (2 dp)
  - **Focus State**:
    - Border: 2 dp, indigo (#a5d6ff)
    - Ring: 2 dp, indigo (#4f46e5) with 50% opacity
    - Ring offset: 2 dp
    - Smooth transition: 300ms

- **Navigation Button**:
  - Text: "Check Answer" (first time)
  - Background: Indigo-purple gradient
  - Text: White, semi-bold
  - Width: Full container width
  - Height: 48-56 dp
  - Border-radius: 8-12 dp
  - Tap feedback: Scale to 1.05x
  - **ALWAYS ENABLED** - Never disabled, even with empty input

**User Experience**:
- User can type freely in the input field
- User can clear text and retype multiple times before checking
- No character restrictions
- No maximum length enforced
- Input field accepts all characters

---

### Phase 3: Answer Checking & Validation

**User Action**: User taps "Check Answer" button

**Validation Logic**:
```typescript
function checkAnswer(userInput, expectedOutput) {
  // 1. Trim whitespace from both
  const userTrimmed = userInput.trim()

  // 2. Remove code block markers from expected output
  const expectedCleaned = expectedOutput.replace(/```|\n/g, "").trim()

  // 3. Exact string comparison (case-sensitive)
  return userTrimmed === expectedCleaned
}
```

**Matching Rules**:
1. **Whitespace**: Leading/trailing spaces are removed, but internal spaces matter
2. **Case**: `"Hello"` DOES NOT match `"hello"` (case-sensitive)
3. **Newlines**: Removed from expected output for comparison
4. **Code Markers**: Backticks and code block markers removed from expected
5. **Special Characters**: Must match exactly (punctuation, symbols, etc.)

**Examples**:
- Input: `"15"` vs Output: `"15"` ’ **Match **
- Input: `"15 "` (with trailing space) vs Output: `"15"` ’ **No Match **
- Input: `"hello"` vs Output: `"Hello"` ’ **No Match ** (case matters)
- Input: `"[1,2,3]"` vs Output: `"[1,2,3]"` ’ **Match **

**System Actions After "Check Answer"**:
1. Compare answer using validation logic
2. If match: `score += 1`
3. If no match: score unchanged
4. Set `showExplanation = true`
5. Update button text: "Check Answer" ’ "Next" (or "Finish" on last question)
6. Disable input field: `disabled={showExplanation}`

---

### Phase 4: Explanation Display & Navigation

**Trigger**: User taps "Check Answer" button

**Screen Changes** (1 second after check):

**Expected Output Card** (appears below input):
- Background: White
- Padding: 16 dp
- Border: 1 dp gray (#e5e7eb)
- Border-radius: 8 dp
- Shadow: 2 dp
- Margin-top: 16 dp
- **Title** (indigo color #4f46e5, semibold, 16 sp, margin-bottom 12 dp):
  - Text: "Expected Output:"
- **Output Display**:
  - Background: Light gray (#f9fafb)
  - Padding: 12 dp
  - Border: 1 dp (#e5e7eb)
  - Border-radius: 4 dp
  - Font-family: Monospace (for code appearance)
  - Content: Markdown-rendered expected output
  - May include code blocks, formatting

**Explanation Card** (appears below Expected Output):
- Same styling as Expected Output Card
- **Title**: "Explanation:"
- **Content**: Markdown-rendered explanation text
- Font: Normal (not monospace)
- Scrollable if very long

**Input Field Changes**:
- Border: Remains visible (#e5e7eb)
- Background: White (no visible change)
- Text: Cannot be modified (disabled)
- Appearance: Remains visible but grayed out

**Navigation Button Changes**:
- Text: "Next" (questions 1-9) or "Finish" (last question)
- Still background: Indigo-purple gradient
- Still fully interactive
- Tap action: Advance to next question or show results

**User Can Now**:
- Read the expected output
- Read the explanation
- Compare their answer to expected
- Click "Next" to continue
- Cannot edit their answer

---

### Phase 5: Results Screen

**Trigger**: User taps "Finish" on last question or completes all questions

**Screen Layout**:

**Background**: Dark gradient
```
linear-gradient(135deg, #1c1c3c, #0f0f1e)
```

**Header**:
- Title: "Test Complete! <‰" (center, 28-32 sp, bold, white)
- Subtitle: Conditional message (18 sp, white):
  - 80-100%: "Excellent performance!" (green)
  - 60-80%: "Great job! Keep practicing." (orange)
  - Below 60%: "Review and try again." (red)

**Score Display**:
- Format: "Your score: {score} / {totalQuestions}"
- Example: "Your score: 7 / 10"
- Score number: Indigo (#4f46e5), bold
- Container: Card with subtle background
- Padding: 20 dp
- Border-radius: 12 dp
- Shadow: 4 dp elevation

**Action Buttons** (stacked vertically, full width):

1. **"Restart Test"** (Primary):
   - Background: Gradient indigo (#4f46e5) ’ purple (#7c3aed)
   - Text: White, semi-bold, 16-18 sp
   - Height: 48-56 dp
   - Width: Full container
   - Border-radius: 8-12 dp
   - Margin-bottom: 12 dp
   - Shadow: `shadow-indigo-500/20`
   - Hover: Scale to 1.05x
   - Tap action: Reset all state, return to first question
     - `current = 0`
     - `score = 0`
     - `userAnswer = ""`
     - `showExplanation = false`
     - `showResult = false`

2. **"Choose New Topic"** (Secondary):
   - Background: Gradient teal (#14b8a6) ’ green (#10b981)
   - Text: White, semi-bold, 16-18 sp
   - Height: 48-56 dp
   - Width: Full container
   - Border-radius: 8-12 dp
   - Shadow: `shadow-teal-500/20`
   - Hover: Scale to 1.05x
   - Tap action: Navigate to `/subjects/{subject}/topics`
   - State reset: Clear all questions and state

**Key Difference from MCQ**: NO "Review Test" button - Results screen is final

---

## 3. Component Architecture

```
OutputTestScreen (Root Component)
   Header Section
      SubtopicName
      TestTypeBadge ("Output Test")
      QuestionCounter ("1 / 10")
   Question Display Section (if not showResult)
      QuestionCard
         QuestionText (Markdown Renderer)
      TextInputField
         onChange handler
      CheckAnswerButton
      ExplanationCards (Conditional: if showExplanation)
          ExpectedOutputCard
          ExplanationCard

ResultsScreen (Conditional: if showResult)
   Title & Subtitle
   ScoreCard
      Score Display
   ActionButtons
       RestartButton
       NewTopicButton
```

---

## 4. Data Models

### Output Question
```typescript
interface OutputQuestion {
  _id: string;              // MongoDB ObjectId
  topicId: string;          // UUID of subtopic
  question: string;         // Question text (markdown)
  output: string;           // Expected output (markdown)
  explanation: string;      // Explanation (markdown)
  createdAt: string;        // ISO timestamp
  updatedAt: string;        // ISO timestamp
}
```

**Key Differences from MCQ Question**:
- No `options` array
- No `correct_answer` index
- Uses `output` instead of options
- Simpler structure

### Test
```typescript
interface OutputTest {
  _id: string;
  subjectName: string;
  topicName: string;
  subtopicName: string;
  subtopicId: string;
  questionType: "output";
  testName: string;         // e.g., "Part 1"
  questionIds: string[];
  questionCount: number;
  createdAt: string;
}
```

---

## 5. API Integration

### Fetch Output Questions

**Endpoint**: `GET /api/questions/output`

**Parameters**:
```
topicId (required): UUID of subtopic
```

**Example Request**:
```
GET /api/questions/output?topicId=550e8400-e29b-41d4-a716-446655440000
```

**Success Response (200)**:
```json
{
  "success": true,
  "count": 10,
  "data": [OutputQuestion, OutputQuestion, ...]
}
```

**Error Responses**:
- `400`: Missing topicId ’ Show error message, "Go Back" button
- `404`: Topic not found ’ Navigate to topics
- `500`: Server error ’ Show error, retry button

---

## 6. State Management

### State Variables

| Variable | Type | Initial | Purpose |
|----------|------|---------|---------|
| `questions` | OutputQuestion[] | [] | All fetched questions |
| `current` | number | 0 | Current question index |
| `score` | number | 0 | Count of correct answers |
| `userAnswer` | string | "" | Current text input |
| `showExplanation` | boolean | false | Display explanation? |
| `showResult` | boolean | false | Display results screen? |
| `loading` | boolean | true | Initially loading |
| `error` | string \| null | null | Error message |

**Key Differences from MCQ**:
- NO `timer` state
- NO `selected` state
- NO `userAnswers` array
- NO `reviewMode` state
- Uses `userAnswer` (string) instead of `selected` (number)

---

## 7. User Interactions & Event Handlers

### 7.1 Text Input Change
**Trigger**: User types in input field

**Handler Logic**:
```typescript
onInputChange(text) {
  userAnswer = text
  // No validation or restrictions
  // No immediate feedback
}
```

**UI Changes**: None (just updates state)

---

### 7.2 Check Answer Button Tap
**Trigger**: User taps "Check Answer" button

**Handler Logic**:
```typescript
onCheckAnswer() {
  // 1. Validate answer
  const userTrimmed = userAnswer.trim()
  const expectedCleaned = questions[current].output
    .replace(/```|\n/g, "")
    .trim()

  // 2. Check if match
  if (userTrimmed === expectedCleaned) {
    score += 1
  }

  // 3. Show explanation
  showExplanation = true
  // Button text changes to "Next" or "Finish"
  // Input field becomes disabled
}
```

**State Changes**:
- `score`: Increments if correct
- `showExplanation`: `false` ’ `true`
- Button: Text changes to "Next" or "Finish"
- Input: Becomes disabled

**UI Changes**:
- Input field disabled (grayed out, read-only)
- Explanation cards appear below
- Button text/function changes

---

### 7.3 Next Button Tap
**Trigger**: User taps "Next" or "Finish" button after checking answer

**Handler Logic**:
```typescript
onNextPressed() {
  // 1. Check if more questions
  if (current + 1 < questions.length) {
    // 2. Reset for next question
    current += 1
    userAnswer = ""
    showExplanation = false
    // Return to Phase 2: Display new question
  } else {
    // 3. Show results
    showResult = true
    // Proceed to Phase 5: Results Screen
  }
}
```

**State Changes**:
- `current`: Increments or stays if last
- `userAnswer`: Resets to empty string
- `showExplanation`: Resets to false
- `showResult`: Set to true if last question

**UI Changes**:
- New question displays (fresh input field, no explanation)
- OR results screen shows (if last question)

---

### 7.4 Restart Test Button Tap
**Trigger**: User taps "Restart Test" from Results Screen

**Handler Logic**:
```typescript
onRestartPressed() {
  current = 0
  score = 0
  userAnswer = ""
  showExplanation = false
  showResult = false
  // Return to first question
}
```

**State Changes**:
- Complete reset of all state

**UI Changes**:
- Returns to first question display
- All answers/progress cleared

---

### 7.5 Choose New Topic Button Tap
**Trigger**: User taps "Choose New Topic" from Results Screen

**Handler Logic**:
```typescript
onChooseNewTopicPressed() {
  // Clear all state
  current = 0
  score = 0
  userAnswer = ""
  showExplanation = false
  showResult = false
  questions = []

  // Navigate to Topics screen
  navigation.navigate('Topics', { subject: subject })
}
```

**Navigation**:
- Navigate to `/subjects/{subject}/topics`
- Topics screen displays for user to select new test

---

## 8. Key Differences from MCQ Test

| Feature | MCQ | Output |
|---------|-----|--------|
| **Timer** | 60 seconds per question | NONE - No timer |
| **Input Method** | Button selection | Text field input |
| **Answer Format** | Index (0-3) | Free-form text |
| **Validation** | Index match (simple) | Exact string match (complex) |
| **Multiple Attempts** | One only | Unlimited re-typing |
| **Answer Checking** | Automatic on "Next" | Manual "Check Answer" click |
| **Feedback Timing** | In review mode | Immediately after check |
| **Loading Spinner** | Between questions | No spinner |
| **Review Mode** | Yes, full review | No review mode |
| **Progress Bar** | Yes, timer-based | No progress bar |
| **Results Options** | Review + Restart + New Topic | Restart + New Topic only |
| **Explanation Display** | In review screen | Right after checking |
| **User Can Edit** | Cannot change selection | Can re-type unlimited times |
| **Empty Input** | Cannot submit without selection | Can submit empty (wrong) |

---

## 9. Visual Design System

### Color Palette (Consistent with MCQ)

**Primary Colors**:
- **Indigo**: `#4f46e5` (Primary buttons, focus states)
- **Purple**: `#7c3aed` (Gradients, accents)
- **Blue**: `#3b82f6` (Information, badges)

**Neutral Colors**:
- **White**: `#ffffff` (Cards, backgrounds)
- **Light Gray**: `#f3f4f6` / `#f9fafb` (Alternative backgrounds)
- **Medium Gray**: `#d1d5db` / `#e5e7eb` (Borders, input borders)
- **Dark Gray**: `#374151` (Body text on light)
- **Very Dark**: `#1f2937` (Headings, primary text)

**Action Colors**:
- **Teal**: `#14b8a6` / `#06b6d4` (Secondary button)
- **Green**: `#10b981` (Success, secondary gradient)

**Backgrounds**:
- **Dark Gradient** (Results): `linear-gradient(135deg, #1c1c3c, #0f0f1e)`
- **Question Cards**: `#ffffff`
- **Section Backgrounds**: `#f9fafb`

---

## 10. Typography (Consistent with MCQ)

**Font Family**: System fonts (SF Pro on iOS, Roboto on Android)

**Sizes & Weights**:

| Element | Size | Weight |
|---------|------|--------|
| Screen Title | 28-32 sp | Bold (700) |
| Section Title | 20-24 sp | Semibold (600) |
| Question Text | 18-20 sp | Bold (700) |
| Input Placeholder | 16 sp | Normal (400) |
| Button Text | 16-18 sp | Semibold (600) |
| Score Display | 32-40 sp | Bold (700) |
| Card Titles | 16 sp | Semibold (600) |
| Body Text | 14-16 sp | Normal (400) |
| Code/Output | 14 sp | Monospace |

---

## 11. Spacing System (Consistent with MCQ)

| Value | Usage |
|-------|-------|
| 4 dp | Micro spacing |
| 8 dp | Small gaps |
| 12 dp | Standard spacing |
| 16 dp | Section spacing |
| 20 dp | Card padding |
| 24 dp | Large spacing |
| 32 dp | Screen padding |

---

## 12. Input Field Specifications

### Normal State
- Border: 2 dp, gray (#e5e7eb)
- Background: White
- Padding: 12-16 dp
- Border-radius: 8 dp
- Font: 16 sp, dark gray (#374151)
- Placeholder: Light gray, "Type the output here..."
- Shadow: 2 dp elevation
- Cursor: Text cursor

### Focus State
- Border: 2 dp, indigo (#a5d6ff - lighter indigo for visibility)
- Ring: 2 dp, indigo (#4f46e5) with 50% opacity
- Ring offset: 2 dp
- Background: White (unchanged)
- Smooth transition: 300ms

### Disabled State (after answer check)
- Border: Still visible (2 dp, #e5e7eb)
- Background: White (unchanged appearance)
- Cursor: not-allowed
- Text: Not editable
- Opacity: Maybe slightly reduced (70-80%)

### Multi-line Support
- If output spans multiple lines, input may need to be textarea
- Height should expand to fit content
- ScrollView if very long

---

## 13. Button Styling (Consistent with MCQ)

### Check Answer / Next / Finish Button
- Width: Full container width
- Height: 48-56 dp
- Border-radius: 8-12 dp
- Padding: 12 dp horizontal, 8 dp vertical
- Font: 16-18 sp, semi-bold, white

**Check Answer State**:
- Background: Indigo-Purple gradient
- `from-indigo-600 to-purple-600`
- Hover: `from-indigo-700 to-purple-700`
- Shadow: `shadow-lg shadow-indigo-500/20`
- Transform: `hover:scale-105`
- Transition: 300ms

**Next/Finish State**:
- Same as Check Answer
- Text changes to "Next" or "Finish"

### Restart Test Button
- Same as above (Indigo-Purple gradient)
- Margin-bottom: 12 dp

### Choose New Topic Button
- Background: Teal-Green gradient
- `from-teal-500 to-green-500`
- Hover: `from-teal-600 to-green-600`
- Shadow: `shadow-lg shadow-teal-500/20`
- Transform: `hover:scale-105`
- All other styling same as Restart

---

## 14. Error Handling

### Failed to Load Questions
**Trigger**: API returns error

**Display**:
- Error message: "Failed to load questions." (red text, #dc2626)
- "Retry" button to refetch
- "Go Back" button to return to topics
- State: No questions loaded, no interaction possible

### No Questions Available
**Trigger**: API returns success with count: 0

**Display**:
- Loading state shows: "Loading questions..."
- If truly empty, show: "No output questions available for this topic."
- Navigation back to topics

### Empty Input Submission
**Trigger**: User submits empty input field

**Behavior**:
- NOT validated/prevented
- User can click "Check Answer" with empty input
- Empty string compared to expected output
- Will be incorrect (unless output is empty, rare case)
- Explanation still shown

### Network Error
**Trigger**: Network unavailable during load

**Display**: Error message with retry option

---

## 15. Edge Cases

### Very Long Output String
- Input field scrollable if needed
- Output display in card with scrollable content if very long
- Text wraps naturally

### Output with Special Characters
- All characters accepted and compared
- Examples: `@#$%^&*()` all match exactly
- Symbols in output must match exactly

### Output with Newlines
- Newlines stripped from expected output for comparison
- User input newlines are trimmed (leading/trailing removed)
- Internal newlines preserved

### Case Sensitivity
- `"Result"` DOES NOT equal `"result"`
- User must type exact case

### Whitespace Sensitivity
- `"5 "` (with space) does NOT equal `"5"` (without space)
- Leading/trailing spaces trimmed from both
- Internal spaces must match

### Very Long Question Text
- Question card scrollable internally
- Input field visible at bottom
- User can scroll up to read full question

---

## 16. Markdown Rendering

**Component Used**: `MDEditorRenderer` (dynamic import, no SSR)

**Used For**:
- Question text (supports code blocks, formatting)
- Expected output (supports code blocks, formatting)
- Explanation (supports formatted text)

**Supported Elements**:
- Code blocks with ```language```
- Inline code with `backticks`
- Bold with **text**
- Italic with *text*
- Lists and nested lists
- Headings
- Tables
- Links

---

## 17. Configuration & Environment Variables

```bash
# API Configuration
REACT_APP_API_BASE_URL=https://api.quizzydock.com

# Theme Colors
REACT_APP_THEME_PRIMARY=#4f46e5
REACT_APP_THEME_SECONDARY=#7c3aed

# Feature Flags
REACT_APP_ENABLE_OUTPUT_TEST=true
```

**Note**: No timer configuration needed for Output test

---

## 18. Accessibility

### Touch Targets
- All buttons: Minimum 48x48 dp
- Input field: Full width, adequate height
- All interactive elements: Easy to tap

### Color Contrast
- Text on buttons: 4.5:1 minimum (WCAG AA)
- Dark on light: 7:1 minimum
- Light on dark: 7:1 minimum

### Text Readability
- Minimum font: 14 sp (body text)
- Line height: 1.4-1.6x font size
- High contrast backgrounds
- Clear label associations

### Input Field
- Proper focus indication (ring/border change)
- Disabled state visually distinct
- Placeholder text is gray (not just position, but color contrast)

### Screen Reader Support
- Button labels: Descriptive (not just "Next")
- Input label: "Type the output here" accessible
- Error messages announced
- Score results read clearly
- Heading hierarchy proper

---

## 19. Performance

- Load questions once (don't refetch between questions)
- Cache API responses with TTL
- Lazy render explanation cards if needed
- Optimize markdown parsing (cache parsed results)
- Limit markdown re-renders per input change
- Clean up event listeners on unmount
- Efficient string comparison algorithm

---

## 20. Navigation Map

```
Topics Screen
    “ Output Test button tap
Output Test Screen
    ’ Question Display (Phase 2)
      ’ Type answer
      ’ Check Answer
          “ (Phase 3)
          Show Explanation
          “ (Phase 4)
          Next/Finish
              “
          More Questions? ’ YES ’ Next Question (Phase 2)
                         ’ NO ’ Results Screen (Phase 5)
    
    ’ Results Screen (Phase 5)
       ’ "Restart Test" ’ Output Test Screen (reset)
       ’ "Choose New Topic" ’ Topics Screen
```

---

## 21. Implementation Checklist for Mobile App

### Phase 1: Setup & Infrastructure
- [ ] Project structure (Screens, Components)
- [ ] Navigation setup
- [ ] API client configuration
- [ ] State management (Redux/Context/Zustand)
- [ ] TypeScript interfaces

### Phase 2: Core Components
- [ ] OutputTestScreen component
- [ ] QuestionCard component
- [ ] TextInputField component
- [ ] ExplanationCard components
- [ ] ResultsScreen component
- [ ] No ReviewScreen needed

### Phase 3: Logic Implementation
- [ ] API integration (fetch output questions)
- [ ] Answer validation logic (exact string matching)
- [ ] Score calculation
- [ ] State management hooks
- [ ] Error handling & retry logic
- [ ] Input field handlers

### Phase 4: Styling & Design
- [ ] Color palette implementation
- [ ] Typography setup
- [ ] Input field styling (normal, focus, disabled)
- [ ] Card styling
- [ ] Button styling
- [ ] Gradient backgrounds
- [ ] Shadows and borders
- [ ] Animations (300ms transitions)

### Phase 5: Features & Polish
- [ ] Markdown rendering for questions/output/explanations
- [ ] Input field focus management
- [ ] Disabled state handling
- [ ] Error messaging
- [ ] Loading states
- [ ] Accessibility features (labels, contrast, touch sizes)

### Phase 6: Testing
- [ ] Component rendering
- [ ] Input field interaction
- [ ] Answer validation logic
- [ ] Score calculation
- [ ] Navigation flows
- [ ] API integration
- [ ] Error scenarios
- [ ] Edge cases (empty input, special chars, case sensitivity)

### Phase 7: Optimization
- [ ] Performance profiling
- [ ] Memory leak detection
- [ ] Network optimization
- [ ] String comparison efficiency

---

## 22. User Testing Scenarios

### Scenario 1: Correct Answer First Try
**User**: Types correct output, clicks "Check Answer"
**Expected**: Score increases, explanation shown, "Next" button enabled

### Scenario 2: Incorrect Answer
**User**: Types wrong output, clicks "Check Answer"
**Expected**: Score unchanged, expected output shown, explanation shown

### Scenario 3: Multiple Attempts
**User**: Types wrong answer first, then modifies and re-checks
**Expected**: Second check validates new answer, score updates if now correct

### Scenario 4: Empty Input
**User**: Clicks "Check Answer" without typing anything
**Expected**: Treated as wrong (unlikely to match), explanation shown

### Scenario 5: Case Sensitivity
**User**: Types `"hello"` when expected is `"Hello"`
**Expected**: Wrong answer, explanation clarifies correct case

### Scenario 6: Whitespace Sensitivity
**User**: Types `"5"` with trailing space when expected is `"5"`
**Expected**: Comparison trims spaces, should match 

### Scenario 7: Special Characters
**User**: Types `"[1, 2, 3]"` with spaces when expected is `"[1,2,3]"`
**Expected**: No match (spaces matter), explanation shown

### Scenario 8: Network Error
**User**: Network fails during initial load
**Expected**: Error message shown, "Retry" option available

---

## 23. Success Metrics

- **Completion Rate**: % users finishing tests
- **Average Score**: Mean score across all tests
- **Attempt Rate**: Average attempts per question
- **Answer Submission Time**: Average time to click "Check Answer"
- **API Response Time**: < 500ms target
- **Error Recovery**: % of users retrying after network error
- **User Satisfaction**: > 4/5 rating

---

## 24. Future Enhancements

- [ ] Partial credit for similar answers
- [ ] Fuzzy matching for whitespace-insensitive mode
- [ ] Hint system before revealing expected output
- [ ] Question randomization
- [ ] Difficulty levels
- [ ] Progress tracking across sessions
- [ ] Offline mode with local caching
- [ ] Question explanations with video links
- [ ] Time tracking (no limit, but measure user time)
- [ ] Comparative analysis (your time vs average)

---

## 25. Document Version

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-11-19 | Comprehensive PRD for Output test in React Native |
| | | 5 phases, text input validation, no timer, no review mode |

---

**End of Output Test PRD Document**
