"use client";

import { pinyin } from "pinyin-pro";
import type { Difficulty } from "./DifficultySelector";

interface SentenceDisplayProps {
  sentence: string;
  difficulty: Difficulty;
  showHintIndex: number | null;
}

export default function SentenceDisplay({
  sentence,
  difficulty,
  showHintIndex,
}: SentenceDisplayProps) {
  const chars = sentence.split("");

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
              className={`text-xs font-medium text-pink-500 h-5 ${
                showPinyin ? "opacity-100" : "opacity-0"
              }`}
            >
              {isChinese ? charPinyin : "\u00A0"}
            </span>
            <span
              className={`text-3xl font-bold ${
                difficulty === "junior" && showHintIndex === i
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
