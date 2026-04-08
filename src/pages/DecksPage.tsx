import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Plus, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getDecks, deleteDeck } from "@/lib/deckStore";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

const DecksPage = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const decks = getDecks();

  const filtered = decks.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    deleteDeck(id);
    toast({ title: "Deck deleted", description: `"${name}" has been removed.` });
    setRefreshKey((k) => k + 1);
  };

  const totalCards = decks.reduce((s, d) => s + d.cards.length, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6" key={refreshKey}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">My Decks</h1>
            <p className="text-muted-foreground text-sm">
              {decks.length} deck{decks.length !== 1 ? "s" : ""} · {totalCards} cards total
            </p>
          </div>
          <Button variant="hero" size="sm" asChild>
            <Link to="/generate"><Plus size={16} /> New Deck</Link>
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Search decks..."
            className="pl-10 bg-muted border-glass-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <BookOpen size={40} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-display font-semibold mb-2">
              {decks.length === 0 ? "No decks yet" : "No matching decks"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {decks.length === 0
                ? "Generate your first flashcard deck to get started."
                : "Try a different search term."}
            </p>
            {decks.length === 0 && (
              <Button variant="hero" size="sm" asChild>
                <Link to="/generate"><Sparkles size={16} /> Generate Flashcards</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((d) => (
              <div key={d.id} className="glass-card-hover p-5 group relative">
                <Link to={`/study?deck=${d.id}`} className="block">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <BookOpen size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{d.name}</h3>
                      <p className="text-xs text-muted-foreground">{d.cards.length} cards</p>
                    </div>
                  </div>
                  <div className="neon-progress-bar mb-2">
                    <div style={{ width: `${d.mastery}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{d.mastery}% mastered</span>
                    <span>
                      {d.lastStudied
                        ? formatDistanceToNow(new Date(d.lastStudied), { addSuffix: true })
                        : formatDistanceToNow(new Date(d.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                  onClick={(e) => { e.preventDefault(); handleDelete(d.id, d.name); }}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

// Need this import for the empty state
import { Sparkles } from "lucide-react";

export default DecksPage;
