export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty?: "easy" | "medium" | "hard";
  lastReviewed?: string;
  nextReview?: string;
}

export interface Deck {
  id: string;
  name: string;
  cards: Flashcard[];
  createdAt: string;
  lastStudied?: string;
  mastery: number;
}

const STORAGE_KEY = "hexon_decks";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

export function getDecks(): Deck[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getDeck(id: string): Deck | undefined {
  return getDecks().find((d) => d.id === id);
}

export function saveDeck(name: string, cards: { question: string; answer: string }[]): Deck {
  const decks = getDecks();
  const deck: Deck = {
    id: generateId(),
    name,
    cards: cards.map((c) => ({
      id: generateId(),
      question: c.question,
      answer: c.answer,
    })),
    createdAt: new Date().toISOString(),
    mastery: 0,
  };
  decks.unshift(deck);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  return deck;
}

export function updateDeck(id: string, updates: Partial<Deck>): void {
  const decks = getDecks().map((d) => (d.id === id ? { ...d, ...updates } : d));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

export function deleteDeck(id: string): void {
  const decks = getDecks().filter((d) => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

export function updateCardDifficulty(deckId: string, cardId: string, difficulty: "easy" | "medium" | "hard"): void {
  const decks = getDecks();
  const deck = decks.find((d) => d.id === deckId);
  if (!deck) return;
  deck.cards = deck.cards.map((c) =>
    c.id === cardId ? { ...c, difficulty, lastReviewed: new Date().toISOString() } : c
  );
  const mastered = deck.cards.filter((c) => c.difficulty === "easy").length;
  deck.mastery = Math.round((mastered / deck.cards.length) * 100);
  deck.lastStudied = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}
