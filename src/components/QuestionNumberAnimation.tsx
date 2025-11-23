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
        @keyframes scaleUpText {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }
        .question-number-animate-container {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          top: -30%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .question-number-text {
          animation: scaleUpText 0.6s ease-out forwards;
        }
      `}</style>
      <div className="question-number-animate-container">
        <div className="question-number-text text-6xl font-bold text-white drop-shadow-2xl">
          Q{questionNumber}
        </div>
      </div>
    </div>
  );
}
