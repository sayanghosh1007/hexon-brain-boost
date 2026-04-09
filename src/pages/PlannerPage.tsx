import DashboardLayout from "@/components/DashboardLayout";
import { Target, BookOpen, Brain, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getDecks } from "@/lib/deckStore";

const PlannerPage = () => {
  const decks = getDecks();
  const totalCards = decks.reduce((s, d) => s + d.cards.length, 0);
  const hasDecks = decks.length > 0;

  // Build a simple study plan from existing decks
  const weakDecks = decks.filter((d) => d.mastery < 60);
  const reviewDecks = decks.filter((d) => d.mastery >= 60 && d.mastery < 90);
  const strongDecks = decks.filter((d) => d.mastery >= 90);

  const planItems = [
    ...weakDecks.map((d) => ({
      task: `Focus study: ${d.name}`,
      type: "study" as const,
      cards: d.cards.length,
      deckId: d.id,
      priority: "high" as const,
    })),
    ...reviewDecks.map((d) => ({
      task: `Review: ${d.name}`,
      type: "review" as const,
      cards: d.cards.length,
      deckId: d.id,
      priority: "medium" as const,
    })),
    ...strongDecks.map((d) => ({
      task: `Quiz yourself: ${d.name}`,
      type: "quiz" as const,
      cards: d.cards.length,
      deckId: d.id,
      priority: "low" as const,
    })),
  ];

  const avgMastery = decks.length > 0 ? Math.round(decks.reduce((s, d) => s + d.mastery, 0) / decks.length) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">
            <Target className="inline mr-2 text-primary" size={28} />
            AI Study Planner
          </h1>
          <p className="text-muted-foreground text-sm">Your personalized study schedule powered by AI.</p>
        </div>

        {!hasDecks ? (
          <div className="glass-card p-12 text-center">
            <Sparkles size={40} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-display font-semibold mb-2">No study plan yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Generate your first flashcard deck and your personalized study plan will appear here automatically.
            </p>
            <Button variant="hero" size="sm" asChild>
              <Link to="/generate">Generate Flashcards</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* AI Insight */}
            <div className="glass-card p-6 gradient-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">AI Recommendation:</strong>{" "}
                {weakDecks.length > 0
                  ? <>Focus on <strong className="text-primary">{weakDecks[0].name}</strong> — it's at {weakDecks[0].mastery}% mastery. Reviewing now will help strengthen your recall.</>
                  : avgMastery >= 90
                    ? "Great work! All your decks are in strong shape. Take a quiz to keep your memory sharp."
                    : "Keep reviewing your decks to push mastery higher. Consistency is key!"}
              </p>
            </div>

            {/* Overview Stats */}
            <div>
              <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-primary" /> Overview
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="glass-card p-5">
                  <p className="text-xs text-muted-foreground mb-2">Total Decks</p>
                  <p className="text-2xl font-display font-bold">{decks.length}</p>
                </div>
                <div className="glass-card p-5">
                  <p className="text-xs text-muted-foreground mb-2">Total Cards</p>
                  <p className="text-2xl font-display font-bold">{totalCards}</p>
                </div>
                <div className="glass-card p-5">
                  <p className="text-xs text-muted-foreground mb-2">Avg Mastery</p>
                  <p className="text-2xl font-display font-bold">{avgMastery}%</p>
                  <div className="neon-progress-bar mt-3">
                    <div style={{ width: `${avgMastery}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Study Plan */}
            <div>
              <h2 className="font-display font-semibold text-lg mb-4">Suggested Study Plan</h2>
              <div className="space-y-3">
                {planItems.map((item, i) => (
                  <div key={i} className="glass-card-hover p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        {item.type === "quiz" ? <Brain size={16} className="text-primary" /> : <BookOpen size={16} className="text-primary" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.task}</p>
                        <p className="text-xs text-muted-foreground">{item.cards} cards · Priority: {item.priority}</p>
                      </div>
                    </div>
                    <Button variant="neon" size="sm" asChild>
                      <Link to={item.type === "quiz" ? `/quiz?deck=${item.deckId}` : `/study?deck=${item.deckId}`}>
                        Start
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PlannerPage;
