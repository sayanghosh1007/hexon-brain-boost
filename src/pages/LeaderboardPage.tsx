import DashboardLayout from "@/components/DashboardLayout";
import { Trophy, Medal, Flame, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const leaderboard = [
  { rank: 1, name: "Alex Chen", cards: 1240, quizScore: 94, streak: 45 },
  { rank: 2, name: "Sarah Kim", cards: 1180, quizScore: 91, streak: 32 },
  { rank: 3, name: "James Wilson", cards: 1050, quizScore: 88, streak: 28 },
  { rank: 4, name: "You", cards: 890, quizScore: 87, streak: 7, isUser: true },
  { rank: 5, name: "Maria Garcia", cards: 820, quizScore: 85, streak: 14 },
  { rank: 6, name: "David Park", cards: 750, quizScore: 82, streak: 10 },
  { rank: 7, name: "Emily Zhang", cards: 680, quizScore: 79, streak: 5 },
];

const rankColors: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-gray-300",
  3: "text-orange-400",
};

const LeaderboardPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">
            <Trophy className="inline mr-2 text-primary" size={28} />
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-sm">See how you rank among learners.</p>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-4 text-xs text-muted-foreground font-semibold uppercase tracking-wider border-b border-glass-border">
            <div className="col-span-1">#</div>
            <div className="col-span-4">User</div>
            <div className="col-span-2 text-center">Cards</div>
            <div className="col-span-2 text-center">Quiz %</div>
            <div className="col-span-3 text-center">Streak</div>
          </div>

          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={cn(
                "grid grid-cols-12 gap-2 p-4 items-center text-sm border-b border-glass-border/50 transition-colors",
                user.isUser && "bg-primary/5 border-primary/20"
              )}
            >
              <div className={cn("col-span-1 font-bold", rankColors[user.rank])}>
                {user.rank <= 3 ? <Medal size={18} className={rankColors[user.rank]} /> : user.rank}
              </div>
              <div className="col-span-4 font-medium flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs text-primary-foreground font-bold">
                  {user.name.charAt(0)}
                </div>
                {user.name}
                {user.isUser && <span className="text-xs text-primary">(You)</span>}
              </div>
              <div className="col-span-2 text-center flex items-center justify-center gap-1">
                <BookOpen size={12} className="text-muted-foreground" />
                {user.cards}
              </div>
              <div className="col-span-2 text-center">{user.quizScore}%</div>
              <div className="col-span-3 text-center flex items-center justify-center gap-1">
                <Flame size={12} className="text-orange-400" />
                {user.streak} days
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeaderboardPage;
