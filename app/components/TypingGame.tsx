"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import DifficultySelector, { type Difficulty } from "./DifficultySelector";
import SentenceDisplay from "./SentenceDisplay";
import ScoreDisplay from "./ScoreDisplay";
import StuckThresholdInput from "./StuckThresholdInput";

interface TypingGameProps {
  sentences: string[];
}

const PUNCTUATION_RE = /[，。、；：「」『』（）！？…—\s,.;:!?'"()\-\[\]{}]/g;

function stripPunctuation(s: string): string {
  return s.replace(PUNCTUATION_RE, "");
}

function calculateScore(sentence: string, input: string): number {
  const expected = stripPunctuation(sentence);
  const actual = stripPunctuation(input);
  const len = expected.length;
  if (len === 0) return 100;

  let mismatches = 0;
  const maxLen = Math.max(expected.length, actual.length);
  for (let i = 0; i < maxLen; i++) {
    if (i >= expected.length || i >= actual.length || expected[i] !== actual[i]) {
      mismatches++;
    }
  }

  return Math.max(0, Math.round((1 - mismatches / len) * 100));
}

function pickRandom(sentences: string[], exclude?: string): string {
  if (sentences.length <= 1) return sentences[0];
  let next: string;
  do {
    next = sentences[Math.floor(Math.random() * sentences.length)];
  } while (next === exclude);
  return next;
}

export default function TypingGame({ sentences }: TypingGameProps) {
  const [currentSentence, setCurrentSentence] = useState(() =>
    pickRandom(sentences)
  );
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("entry");
  const [stuckThreshold, setStuckThreshold] = useState(5);
  const [showHintIndex, setShowHintIndex] = useState<number | null>(null);

  const lastKeystrokeRef = useRef<number>(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    setScore(calculateScore(currentSentence, userInput));
  };

  const handleNext = () => {
    setCurrentSentence(pickRandom(sentences, currentSentence));
    setUserInput("");
    setScore(null);
    setShowHintIndex(null);
    inputRef.current?.focus();
  };

  const handleInputChange = (value: string) => {
    setUserInput(value);
    lastKeystrokeRef.current = Date.now();
    setShowHintIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && score === null) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Stuck detection for Junior mode
  const checkStuck = useCallback(() => {
    if (difficulty !== "junior" || score !== null) return;

    const elapsed = Date.now() - lastKeystrokeRef.current;
    if (elapsed >= stuckThreshold * 1000) {
      const strippedSentence = stripPunctuation(currentSentence);
      const strippedInput = stripPunctuation(userInput);
      const stuckPos = strippedInput.length;

      if (stuckPos < strippedSentence.length) {
        // Map stripped position back to original sentence position
        let count = 0;
        for (let i = 0; i < currentSentence.length; i++) {
          if (!PUNCTUATION_RE.test(currentSentence[i])) {
            // Reset lastIndex since we use /g flag
            PUNCTUATION_RE.lastIndex = 0;
            if (count === stuckPos) {
              setShowHintIndex(i);
              return;
            }
            count++;
          }
          PUNCTUATION_RE.lastIndex = 0;
        }
      }
    }
  }, [difficulty, score, stuckThreshold, currentSentence, userInput]);

  useEffect(() => {
    if (difficulty !== "junior") return;
    const interval = setInterval(checkStuck, 1000);
    return () => clearInterval(interval);
  }, [difficulty, checkStuck]);

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h1 className="text-4xl font-black text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
        中文打字練習
      </h1>

      {/* Difficulty */}
      <DifficultySelector difficulty={difficulty} onChange={setDifficulty} />

      {/* Stuck threshold for Junior mode */}
      {difficulty === "junior" && (
        <StuckThresholdInput
          value={stuckThreshold}
          onChange={setStuckThreshold}
        />
      )}

      {/* Sentence card */}
      <div className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl p-8 border-2 border-purple-200">
        <SentenceDisplay
          sentence={currentSentence}
          difficulty={difficulty}
          showHintIndex={showHintIndex}
        />
      </div>

      {/* Input area */}
      <div className="flex flex-col gap-4">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={score !== null}
          placeholder="在這裡輸入..."
          className="w-full rounded-xl border-3 border-purple-300 px-5 py-4 text-2xl font-medium text-indigo-900 placeholder-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:opacity-50 disabled:bg-gray-50"
        />

        {score === null ? (
          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            送出 ✓
          </button>
        ) : (
          <>
            <ScoreDisplay score={score} />
            <button
              onClick={handleNext}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              下一題 →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
