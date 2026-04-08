import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Brain, CheckCircle2, XCircle, ArrowRight, Clock } from "lucide-react";

const questions = [
  {
    q: "What is the time complexity of Binary Search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
    explanation: "Binary Search divides the search space in half each iteration, giving O(log n) time complexity.",
  },
  {
    q: "Binary Search requires the array to be:",
    options: ["Empty", "Sorted", "Reversed", "Randomized"],
    correct: 1,
    explanation: "Binary Search only works correctly on sorted arrays because it relies on the ordering to eliminate half the search space.",
  },
  {
    q: "The space complexity of iterative Binary Search is:",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correct: 3,
    explanation: "Iterative Binary Search only uses a constant number of variables regardless of input size.",
  },
];

const QuizPage = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);

  const question = questions[current];
  const isAnswered = selected !== null;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResults(true);
    }
  };

  const score = answers.filter((a, i) => a === questions[i].correct).length;

  if (showResults) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto space-y-8 text-center">
          <div className="glass-card p-10 gradient-border">
            <Brain size={48} className="mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-display font-bold mb-2">Quiz Complete!</h1>
            <p className="text-5xl font-display font-bold gradient-text my-6">
              {score}/{questions.length}
            </p>
            <p className="text-muted-foreground mb-6">
              {score === questions.length ? "Perfect score! 🎉" : score >= questions.length / 2 ? "Good job! Keep studying. 💪" : "Review the material and try again. 📚"}
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="hero" onClick={() => { setCurrent(0); setSelected(null); setAnswers([]); setShowResults(false); }}>
                Retry Quiz
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                Back to Dashboard
              </Button>
            </div>
          </div>

          {/* Review */}
          <div className="space-y-4 text-left">
            <h2 className="font-display font-semibold text-lg">Review Answers</h2>
            {questions.map((q, i) => (
              <div key={i} className={cn("glass-card p-5", answers[i] === q.correct ? "border-neon-green/20" : "border-destructive/20")}>
                <p className="font-semibold mb-2">{q.q}</p>
                <p className="text-sm">
                  {answers[i] === q.correct ? (
                    <span className="text-neon-green flex items-center gap-1"><CheckCircle2 size={14} /> Correct: {q.options[q.correct]}</span>
                  ) : (
                    <span className="text-destructive flex items-center gap-1"><XCircle size={14} /> Your answer: {q.options[answers[i]!]} — Correct: {q.options[q.correct]}</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-2">{q.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-display font-bold">Quiz Mode</h1>
            <p className="text-sm text-muted-foreground">Binary Search</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={14} />
            {current + 1}/{questions.length}
          </div>
        </div>

        <div className="neon-progress-bar">
          <div style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>

        <div className="glass-card p-8">
          <p className="text-lg font-display font-semibold mb-6">{question.q}</p>
          <div className="space-y-3">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all duration-200 text-sm",
                  selected === null && "border-glass-border hover:border-primary/30 hover:bg-muted",
                  selected === idx && idx === question.correct && "border-neon-green/50 bg-neon-green/10",
                  selected === idx && idx !== question.correct && "border-destructive/50 bg-destructive/10",
                  selected !== null && idx === question.correct && selected !== idx && "border-neon-green/30",
                  selected !== null && selected !== idx && idx !== question.correct && "opacity-50"
                )}
              >
                <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {opt}
                {isAnswered && idx === question.correct && <CheckCircle2 size={16} className="inline ml-2 text-neon-green" />}
                {isAnswered && selected === idx && idx !== question.correct && <XCircle size={16} className="inline ml-2 text-destructive" />}
              </button>
            ))}
          </div>

          {isAnswered && (
            <div className="mt-6 p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground animate-fade-in">
              <strong className="text-foreground">Explanation:</strong> {question.explanation}
            </div>
          )}
        </div>

        {isAnswered && (
          <div className="flex justify-end animate-fade-in">
            <Button variant="hero" onClick={handleNext}>
              {current < questions.length - 1 ? "Next Question" : "See Results"}
              <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default QuizPage;
