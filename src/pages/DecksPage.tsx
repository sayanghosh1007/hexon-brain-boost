import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const decks = [
  { name: "Binary Search", cards: 24, mastery: 75, lastStudied: "2 hours ago", color: "neon-blue" },
  { name: "Photosynthesis", cards: 18, mastery: 45, lastStudied: "Yesterday", color: "neon-purple" },
  { name: "French Revolution", cards: 32, mastery: 30, lastStudied: "3 days ago", color: "neon-cyan" },
  { name: "Python Lists", cards: 20, mastery: 90, lastStudied: "1 week ago", color: "neon-green" },
  { name: "Organic Chemistry", cards: 28, mastery: 55, lastStudied: "5 days ago", color: "neon-blue" },
  { name: "Machine Learning", cards: 35, mastery: 20, lastStudied: "2 weeks ago", color: "neon-purple" },
];

const DecksPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">My Decks</h1>
            <p className="text-muted-foreground text-sm">{decks.length} decks · {decks.reduce((s, d) => s + d.cards, 0)} cards total</p>
          </div>
          <Button variant="hero" size="sm" asChild>
            <Link to="/generate"><Plus size={16} /> New Deck</Link>
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input placeholder="Search decks..." className="pl-10 bg-muted border-glass-border" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((d) => (
            <Link to="/study" key={d.name} className="glass-card-hover p-5 group block">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{d.name}</h3>
                  <p className="text-xs text-muted-foreground">{d.cards} cards</p>
                </div>
              </div>
              <div className="neon-progress-bar mb-2">
                <div style={{ width: `${d.mastery}%` }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{d.mastery}% mastered</span>
                <span>{d.lastStudied}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DecksPage;
