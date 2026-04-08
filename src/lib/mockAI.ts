// Mock AI flashcard generation from various input types

interface GeneratedCard {
  question: string;
  answer: string;
}

const topicDatabase: Record<string, GeneratedCard[]> = {
  default: [
    { question: "What is the main concept of this topic?", answer: "The fundamental principle involves understanding the core building blocks and how they interact within the larger system." },
    { question: "What are the key components?", answer: "The key components include the primary elements, their relationships, and the rules governing their behavior." },
    { question: "Why is this topic important?", answer: "Understanding this topic provides a foundation for advanced concepts and practical applications in the field." },
    { question: "What are common misconceptions?", answer: "A common misconception is oversimplifying the relationships between components, which leads to incomplete understanding." },
    { question: "How does this apply in practice?", answer: "In practice, this concept is applied through systematic analysis, pattern recognition, and structured problem-solving." },
    { question: "What are the prerequisites for understanding this?", answer: "A basic understanding of foundational terminology and elementary principles in the related domain." },
    { question: "What are the advantages of mastering this topic?", answer: "Mastery enables faster problem-solving, deeper analytical thinking, and the ability to tackle complex challenges." },
    { question: "How has this field evolved over time?", answer: "The field has evolved from basic theoretical frameworks to sophisticated modern approaches incorporating technology and research." },
  ],
};

function generateFromTopic(topic: string): GeneratedCard[] {
  const t = topic.trim().toLowerCase();
  const cards = topicDatabase[t] || topicDatabase.default;
  return cards.map((c) => ({
    question: c.question.replace("this topic", `"${topic}"`).replace("this", `"${topic}"`),
    answer: c.answer,
  }));
}

function generateFromNotes(notes: string): GeneratedCard[] {
  const sentences = notes
    .split(/[.!?\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);

  if (sentences.length === 0) return topicDatabase.default;

  const cards: GeneratedCard[] = [];
  for (let i = 0; i < Math.min(sentences.length, 10); i++) {
    const sentence = sentences[i];
    const words = sentence.split(" ");
    if (words.length < 4) continue;

    // Create a fill-in-the-blank style question
    const keywordIdx = Math.floor(words.length / 2);
    const keyword = words[keywordIdx];
    const blanked = words.map((w, j) => (j === keywordIdx ? "______" : w)).join(" ");

    cards.push({
      question: `Complete the statement: "${blanked}"`,
      answer: `The missing word is "${keyword}". Full statement: "${sentence}"`,
    });

    // Also create a "what" question from longer sentences
    if (words.length > 8) {
      cards.push({
        question: `Explain the following concept: "${sentence.substring(0, 60)}..."`,
        answer: sentence,
      });
    }
  }

  return cards.length > 0 ? cards.slice(0, 10) : topicDatabase.default;
}

function generateFromUrl(url: string): GeneratedCard[] {
  const domain = url.replace(/https?:\/\//, "").split("/")[0];
  return [
    { question: `What is the main topic covered at ${domain}?`, answer: "The resource covers key concepts and practical applications related to the subject matter." },
    { question: "What are the key takeaways from this resource?", answer: "The main takeaways include understanding core principles, best practices, and common patterns." },
    { question: "How does this resource explain the concept?", answer: "It breaks down complex ideas into digestible sections with examples and practical demonstrations." },
    { question: "What examples are provided?", answer: "The resource includes real-world examples, code samples, and step-by-step walkthroughs." },
    { question: "What should you study next after this resource?", answer: "Advanced topics building on the fundamentals covered, including edge cases and optimization techniques." },
  ];
}

export function generateFlashcards(
  method: string,
  input: string
): Promise<GeneratedCard[]> {
  // Simulate AI processing delay
  return new Promise((resolve) => {
    const delay = 1500 + Math.random() * 1500;
    setTimeout(() => {
      let cards: GeneratedCard[];
      switch (method) {
        case "topic":
          cards = generateFromTopic(input);
          break;
        case "notes":
          cards = generateFromNotes(input);
          break;
        case "url":
          cards = generateFromUrl(input);
          break;
        case "document":
        case "image":
          cards = topicDatabase.default.map((c) => ({
            question: c.question.replace("this topic", "the uploaded content"),
            answer: c.answer,
          }));
          break;
        default:
          cards = topicDatabase.default;
      }
      resolve(cards);
    }, delay);
  });
}
