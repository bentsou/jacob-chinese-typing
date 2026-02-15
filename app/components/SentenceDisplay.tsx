"use client";

import { pinyin } from "pinyin-pro";
import type { Difficulty } from "./DifficultySelector";

const PUNCTUATION_RE = /[，。、；：「」『』（）！？…—\s,.;:!?'"()\-\[\]{}]/;

interface SentenceDisplayProps {
  sentence: string;
  difficulty: Difficulty;
  showHintIndex: number | null;
  userInput?: string;
  submitted?: boolean;
}

export default function SentenceDisplay({
  sentence,
  difficulty,
  showHintIndex,
  userInput,
  submitted,
}: SentenceDisplayProps) {
  const chars = sentence.split("");

  // Build a map from each non-punctuation sentence char index to whether it matches input
  const mismatchSet = new Set<number>();
  if (submitted && userInput !== undefined) {
    // Strip punctuation from input
    const strippedInput = userInput.replace(new RegExp(PUNCTUATION_RE.source, "g"), "");
    let inputIdx = 0;
    for (let i = 0; i < chars.length; i++) {
      if (!PUNCTUATION_RE.test(chars[i])) {
        if (inputIdx >= strippedInput.length || chars[i] !== strippedInput[inputIdx]) {
          mismatchSet.add(i);
        }
        inputIdx++;
      }
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-x-1 gap-y-3">
      {chars.map((char, i) => {
        const charPinyin = pinyin(char, { toneType: "symbol" });
        const isChinese = /[\u4e00-\u9fff]/.test(char);
        const showPinyin =
          isChinese &&
          (difficulty === "entry" ||
            (difficulty === "junior" && showHintIndex === i));

        return (
          <div key={i} className="flex flex-col items-center">
            <span
              className={`text-xl font-medium text-pink-500 h-6 ${
                showPinyin ? "opacity-100" : "opacity-0"
              }`}
            >
              {isChinese ? charPinyin : "\u00A0"}
            </span>
            <span
              className={`text-5xl font-bold ${
                mismatchSet.has(i)
                  ? "text-red-500 bg-red-100 rounded"
                  : difficulty === "junior" && showHintIndex === i
                    ? "text-pink-500"
                    : "text-indigo-900"
              }`}
            >
              {char}
            </span>
          </div>
        );
      })}
    </div>
  );
}
