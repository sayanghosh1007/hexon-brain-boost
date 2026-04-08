import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, ThumbsDown, Minus, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

const sampleCards = [
  { q: "What is Binary Search?", a: "A search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half." },
  { q: "What is the time complexity of Binary Search?", a: "O(log n) — where n is the number of elements in the array." },
  { q: "When should you use Binary Search?", a: "When the data is sorted and you need to find a specific element efficiently." },
  { q: "What is the space complexity of iterative Binary Search?", a: "O(1) — constant space, as it only uses a few variables." },
  { q: "What happens if the array is not sorted?", a: "Binary Search will not work correctly. You must sort the array first or use a linear search." },
];

const StudyPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const card = sampleCards[currentIndex];

  const next = () => { setIsFlipped(false); setTimeout(() => setCurrentIndex((i) => Math.min(i + 1, sampleCards.length - 1)), 150); };
  const prev = () => { setIsFlipped(false); setTimeout(() => setCurrentIndex((i) => Math.max(i - 1, 0)), 150); };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-1">Study Mode</h1>
          <p className="text-muted-foreground text-sm">Binary Search · {sampleCards.length} cards</p>
        </div>

        {/* Progress */}
        <div className="neon-progress-bar">
          <div style={{ width: `${((currentIndex + 1) / sampleCards.length) * 100}%` }} />
        </div>
        <p className="text-center text-xs text-muted-foreground">{currentIndex + 1} / {sampleCards.length}</p>

        {/* Flashcard */}
        <div
          className="relative cursor-pointer mx-auto"
          style={{ perspective: "1000px", minHeight: "300px" }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={cn("w-full h-full transition-transform duration-500 relative")}
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 glass-card gradient-border p-8 flex flex-col items-center justify-center text-center"
              style={{ backfaceVisibility: "hidden", minHeight: "300px" }}
            >
              <p className="text-xs text-primary mb-4 font-semibold uppercase tracking-wider">Question</p>
              <p className="text-xl font-display font-semibold">{card.q}</p>
              <p className="text-xs text-muted-foreground mt-6">Click to reveal answer</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 glass-card p-8 flex flex-col items-center justify-center text-center border border-primary/30"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", minHeight: "300px" }}
            >
              <p className="text-xs text-accent mb-4 font-semibold uppercase tracking-wider">Answer</p>
              <p className="text-lg leading-relaxed">{card.a}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" size="icon" onClick={prev} disabled={currentIndex === 0}>
            <ChevronLeft size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Shuffle size={18} />
          </Button>
          <Button variant="ghost" size="icon">
            <RotateCcw size={18} />
          </Button>
          <Button variant="outline" size="icon" onClick={next} disabled={currentIndex === sampleCards.length - 1}>
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Difficulty rating */}
        {isFlipped && (
          <div className="flex justify-center gap-3 animate-fade-in">
            <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10" onClick={next}>
              <ThumbsDown size={14} /> Hard
            </Button>
            <Button variant="outline" size="sm" className="border-accent/30 text-accent hover:bg-accent/10" onClick={next}>
              <Minus size={14} /> Medium
            </Button>
            <Button variant="outline" size="sm" className="border-neon-green/30 text-neon-green hover:bg-neon-green/10" onClick={next}>
              <ThumbsUp size={14} /> Easy
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudyPage;
