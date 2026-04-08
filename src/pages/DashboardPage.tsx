import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sparkles,
  BookOpen,
  Brain,
  Flame,
  TrendingUp,
  Clock,
  Target,
  ArrowRight,
} from "lucide-react";

const stats = [
  { label: "Cards Studied", value: "248", icon: BookOpen, change: "+12 today" },
  { label: "Quiz Score", value: "87%", icon: Brain, change: "+5% this week" },
  { label: "Study Streak", value: "7 days", icon: Flame, change: "🔥 Keep going!" },
  { label: "Study Time", value: "4.2h", icon: Clock, change: "This week" },
];

const recentDecks = [
  { name: "Binary Search", cards: 24, lastStudied: "2 hours ago", progress: 75 },
  { name: "Photosynthesis", cards: 18, lastStudied: "Yesterday", progress: 45 },
  { name: "French Revolution", cards: 32, lastStudied: "3 days ago", progress: 30 },
  { name: "Python Lists", cards: 20, lastStudied: "1 week ago", progress: 90 },
];

const quickActions = [
  { label: "Generate Flashcards", icon: Sparkles, path: "/generate", variant: "hero" as const },
  { label: "Take a Quiz", icon: Brain, path: "/quiz", variant: "neon" as const },
  { label: "Study Deck", icon: BookOpen, path: "/decks", variant: "outline" as const },
  { label: "Study Planner", icon: Target, path: "/planner", variant: "outline" as const },
];

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-1">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground">Here's your learning overview.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <Button key={a.label} variant={a.variant} size="lg" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to={a.path}>
                <a.icon size={20} />
                <span className="text-xs">{a.label}</span>
              </Link>
            </Button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-card-hover p-5">
              <div className="flex items-center gap-2 mb-3">
                <s.icon size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className="text-2xl font-display font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
            </div>
          ))}
        </div>

        {/* AI Recommendation */}
        <div className="glass-card p-6 gradient-border">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold mb-1">AI Study Insight</h3>
              <p className="text-sm text-muted-foreground">
                Review 20 flashcards on <strong className="text-foreground">Binary Search</strong> today to maintain your streak.
                Your accuracy dropped 12% — focus on tree traversal concepts.
              </p>
            </div>
            <Button variant="neon" size="sm" asChild>
              <Link to="/study">Start Review <ArrowRight size={14} /></Link>
            </Button>
          </div>
        </div>

        {/* Recent Decks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold">Recent Decks</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/decks">View All <ArrowRight size={14} /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {recentDecks.map((d) => (
              <div key={d.name} className="glass-card-hover p-5 group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{d.name}</h3>
                  <span className="text-xs text-muted-foreground">{d.cards} cards</span>
                </div>
                <div className="neon-progress-bar mb-2">
                  <div style={{ width: `${d.progress}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{d.progress}% mastered</span>
                  <span className="text-xs text-muted-foreground">{d.lastStudied}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
