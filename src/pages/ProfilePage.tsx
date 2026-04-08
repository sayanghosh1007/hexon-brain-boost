import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, BookOpen, Brain, Flame, Clock, LogOut } from "lucide-react";

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-3xl">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">Profile & Settings</h1>
          <p className="text-muted-foreground text-sm">Manage your account and view statistics.</p>
        </div>

        {/* Profile Card */}
        <div className="glass-card p-6 gradient-border">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-primary-foreground">
              A
            </div>
            <div>
              <h2 className="text-xl font-display font-bold">Alex Student</h2>
              <p className="text-sm text-muted-foreground">alex@example.com</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <Input defaultValue="Alex Student" className="pl-9 bg-muted border-glass-border" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <Input defaultValue="alex@example.com" className="pl-9 bg-muted border-glass-border" />
              </div>
            </div>
          </div>
          <Button variant="hero" size="sm" className="mt-4">Save Changes</Button>
        </div>

        {/* Stats */}
        <div>
          <h2 className="font-display font-semibold text-lg mb-4">Study Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Cards", value: "890", icon: BookOpen },
              { label: "Quizzes Taken", value: "42", icon: Brain },
              { label: "Best Streak", value: "14 days", icon: Flame },
              { label: "Total Study", value: "24.5h", icon: Clock },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4 text-center">
                <s.icon size={20} className="mx-auto mb-2 text-primary" />
                <p className="text-xl font-display font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Report */}
        <div className="glass-card p-6">
          <h2 className="font-display font-semibold text-lg mb-4">This Week's Report</h2>
          <div className="space-y-3">
            {[
              { day: "Mon", cards: 32, time: "45min" },
              { day: "Tue", cards: 28, time: "38min" },
              { day: "Wed", cards: 45, time: "52min" },
              { day: "Thu", cards: 22, time: "30min" },
              { day: "Fri", cards: 38, time: "42min" },
              { day: "Sat", cards: 15, time: "20min" },
              { day: "Sun", cards: 0, time: "0min" },
            ].map((d) => (
              <div key={d.day} className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-8">{d.day}</span>
                <div className="flex-1 neon-progress-bar">
                  <div style={{ width: `${(d.cards / 45) * 100}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-16 text-right">{d.cards} cards</span>
                <span className="text-xs text-muted-foreground w-12 text-right">{d.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-card p-6 border-destructive/20">
          <h2 className="font-display font-semibold text-lg mb-2">Account</h2>
          <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10">
            <LogOut size={16} /> Sign Out
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
