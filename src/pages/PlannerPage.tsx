import DashboardLayout from "@/components/DashboardLayout";
import { Target, BookOpen, Brain, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const todayPlan = [
  { time: "9:00 AM", task: "Review Binary Search deck", type: "review", cards: 20 },
  { time: "11:00 AM", task: "Study Photosynthesis — weak topics", type: "study", cards: 15 },
  { time: "2:00 PM", task: "Take quiz on French Revolution", type: "quiz", cards: 10 },
  { time: "5:00 PM", task: "Review new Machine Learning cards", type: "review", cards: 12 },
];

const weeklyGoals = [
  { label: "Cards Reviewed", current: 148, target: 200 },
  { label: "Quizzes Taken", current: 5, target: 7 },
  { label: "Study Hours", current: 3.5, target: 5 },
];

const PlannerPage = () => {
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

        {/* AI Insight */}
        <div className="glass-card p-6 gradient-border">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">AI Recommendation:</strong> Focus on <strong className="text-primary">Photosynthesis</strong> today — your accuracy dropped 15% since last week.
            Reviewing 20 cards now will prevent further memory decay.
          </p>
        </div>

        {/* Weekly Goals */}
        <div>
          <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-primary" /> Weekly Goals
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {weeklyGoals.map((g) => (
              <div key={g.label} className="glass-card p-5">
                <p className="text-xs text-muted-foreground mb-2">{g.label}</p>
                <p className="text-2xl font-display font-bold">
                  {g.current}<span className="text-muted-foreground text-sm font-normal">/{g.target}</span>
                </p>
                <div className="neon-progress-bar mt-3">
                  <div style={{ width: `${Math.min((g.current / g.target) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Plan */}
        <div>
          <h2 className="font-display font-semibold text-lg mb-4">Today's Study Plan</h2>
          <div className="space-y-3">
            {todayPlan.map((item, i) => (
              <div key={i} className="glass-card-hover p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground w-16">{item.time}</span>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    {item.type === "quiz" ? <Brain size={16} className="text-primary" /> : <BookOpen size={16} className="text-primary" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.task}</p>
                    <p className="text-xs text-muted-foreground">{item.cards} cards</p>
                  </div>
                </div>
                <Button variant="neon" size="sm">Start</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlannerPage;
