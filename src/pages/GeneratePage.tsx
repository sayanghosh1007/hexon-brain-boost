import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Zap,
  FileText,
  Upload,
  Link2,
  Image,
  PenTool,
  Sparkles,
  ChevronRight,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type InputMethod = "topic" | "notes" | "document" | "url" | "image" | "manual";

const methods: { id: InputMethod; icon: any; label: string; desc: string }[] = [
  { id: "topic", icon: Zap, label: "Topic Name", desc: "Enter a topic and AI generates cards" },
  { id: "notes", icon: FileText, label: "Notes / Text", desc: "Paste lecture notes or study material" },
  { id: "document", icon: Upload, label: "Document Upload", desc: "Upload PDF, DOC, TXT, or PPT" },
  { id: "url", icon: Link2, label: "URL / Link", desc: "Paste a blog or documentation URL" },
  { id: "image", icon: Image, label: "Image Upload", desc: "Upload notebook or whiteboard photos" },
  { id: "manual", icon: PenTool, label: "Manual Creation", desc: "Create flashcards manually" },
];

const GeneratePage = () => {
  const [activeMethod, setActiveMethod] = useState<InputMethod>("topic");
  const [manualCards, setManualCards] = useState([{ q: "", a: "" }]);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-1">
            <Sparkles className="inline mr-2 text-primary" size={28} />
            Generate Flashcards
          </h1>
          <p className="text-muted-foreground">Choose an input method and let AI create your flashcards.</p>
        </div>

        {/* Method selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMethod(m.id)}
              className={cn(
                "glass-card p-4 text-left transition-all duration-200",
                activeMethod === m.id
                  ? "border-primary/50 neon-glow-blue"
                  : "hover:border-glass-border/80"
              )}
            >
              <m.icon size={20} className={activeMethod === m.id ? "text-primary" : "text-muted-foreground"} />
              <p className="font-semibold text-sm mt-2">{m.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="glass-card p-6">
          {activeMethod === "topic" && (
            <div className="space-y-4">
              <Label>Enter a Topic</Label>
              <Input placeholder="e.g., Binary Search, Photosynthesis, Python Lists..." className="bg-muted border-glass-border" />
              <div className="flex gap-2 flex-wrap">
                {["Binary Search", "Photosynthesis", "French Revolution", "Python Lists"].map((t) => (
                  <button key={t} className="text-xs bg-muted px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeMethod === "notes" && (
            <div className="space-y-4">
              <Label>Paste Your Notes</Label>
              <Textarea placeholder="Paste your lecture notes, study material, or any text content here..." className="bg-muted border-glass-border min-h-[200px]" />
            </div>
          )}

          {activeMethod === "document" && (
            <div className="space-y-4">
              <Label>Upload Document</Label>
              <div className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center hover:border-primary/30 transition-colors cursor-pointer">
                <Upload size={40} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, DOCX, TXT, PPT, PPTX
                </p>
              </div>
            </div>
          )}

          {activeMethod === "url" && (
            <div className="space-y-4">
              <Label>Paste URL</Label>
              <Input placeholder="https://example.com/article..." className="bg-muted border-glass-border" />
              <p className="text-xs text-muted-foreground">Blogs, documentation, educational articles</p>
            </div>
          )}

          {activeMethod === "image" && (
            <div className="space-y-4">
              <Label>Upload Image</Label>
              <div className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center hover:border-primary/30 transition-colors cursor-pointer">
                <Image size={40} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Upload notebook photos, whiteboard images, or book pages
                </p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG</p>
              </div>
            </div>
          )}

          {activeMethod === "manual" && (
            <div className="space-y-4">
              <Label>Create Flashcards Manually</Label>
              {manualCards.map((card, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex-1 space-y-2">
                    <Input placeholder="Question" value={card.q} onChange={(e) => {
                      const next = [...manualCards];
                      next[i].q = e.target.value;
                      setManualCards(next);
                    }} className="bg-muted border-glass-border" />
                    <Input placeholder="Answer" value={card.a} onChange={(e) => {
                      const next = [...manualCards];
                      next[i].a = e.target.value;
                      setManualCards(next);
                    }} className="bg-muted border-glass-border" />
                  </div>
                  {manualCards.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => setManualCards(manualCards.filter((_, j) => j !== i))}>
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setManualCards([...manualCards, { q: "", a: "" }])}>
                <Plus size={14} /> Add Card
              </Button>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Button variant="hero" size="lg">
              <Sparkles size={18} />
              Generate Flashcards
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GeneratePage;
