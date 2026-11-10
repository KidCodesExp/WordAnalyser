export type TextStats = {
  chars: number;
  charsNoSpace: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  avgWordLength: number;
  readability: number;
  topWords: { word: string; count: number }[];
};

export function analyzeText(text: string): TextStats {
  const trimmed = text.trim();
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const wordsArr = trimmed ? trimmed.toLowerCase().match(/[a-z0-9']+/g) ?? [] : [];
  const words = wordsArr.length;
  const sentences = trimmed ? Math.max(1, (trimmed.match(/[.!?]+/g) ?? []).length) : 0;
  const paragraphs = trimmed ? trimmed.split(/\n{2,}/).filter(Boolean).length : 0;
  const readingTime = Math.max(1, Math.round(words / 200));
  const avgWordLength = words
    ? Math.round((wordsArr.reduce((s, w) => s + w.length, 0) / words) * 10) / 10
    : 0;

  const freq: Record<string, number> = {};
  for (const w of wordsArr) if (w.length > 2) freq[w] = (freq[w] ?? 0) + 1;
  const topWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([word, count]) => ({ word, count }));

  const syllables = wordsArr.reduce(
    (s, w) => s + Math.max(1, (w.match(/[aeiouy]+/g) ?? []).length),
    0,
  );
  const readability = words && sentences
    ? Math.max(
        0,
        Math.min(
          100,
          Math.round(
            206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words),
          ),
        ),
      )
    : 0;

  return {
    chars,
    charsNoSpace,
    words,
    sentences,
    paragraphs,
    readingTime,
    avgWordLength,
    readability,
    topWords,
  };
}
