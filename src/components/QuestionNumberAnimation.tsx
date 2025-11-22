"use client";

interface QuestionNumberAnimationProps {
  questionNumber: number;
}

export default function QuestionNumberAnimation({
  questionNumber,
}: QuestionNumberAnimationProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <style>{`
        @keyframes scaleAndFadeWithBackground {
          0% {
            opacity: 0;
            transform: scale(0.5);
            background-color: rgba(0, 0, 0, 0.5);
          }
          30% {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.5);
          }
          70% {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.5);
          }
          100% {
            opacity: 0;
            transform: scale(2);
            background-color: rgba(0, 0, 0, 0);
          }
        }
        .question-number-animate-container {
          animation: scaleAndFadeWithBackground 0.5s ease-out forwards;
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      <div className="question-number-animate-container">
        <div className="text-6xl font-bold text-white drop-shadow-2xl">
          Q{questionNumber}
        </div>
      </div>
    </div>
  );
}
