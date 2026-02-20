"use client";

import { useState, useRef, useCallback } from "react";
import GradeSelector, { type Grade } from "./GradeSelector";
import MathProblem, { type Problem } from "./MathProblem";

type Operator = "+" | "−" | "×";

interface GradeConfig {
  addition: [number, number];
  subtraction: [number, number] | null;
  multiplication: [number, number][] | null;
}

const gradeConfigs: Record<Grade, GradeConfig> = {
  1: { addition: [1, 10], subtraction: [1, 10], multiplication: null },
  2: { addition: [1, 20], subtraction: [1, 20], multiplication: null },
  3: { addition: [1, 100], subtraction: [1, 100], multiplication: [[1, 9], [1, 9]] },
  4: { addition: [1, 500], subtraction: [1, 500], multiplication: [[1, 9], [10, 99]] },
  5: { addition: [1, 1000], subtraction: [1, 1000], multiplication: [[10, 99], [10, 99]] },
  6: { addition: [1, 5000], subtraction: [1, 5000], multiplication: [[10, 99], [100, 999]] },
};

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem(grade: Grade): Problem {
  const config = gradeConfigs[grade];
  const operators: Operator[] = ["+", "−"];
  if (config.multiplication) operators.push("×");

  const operator = operators[Math.floor(Math.random() * operators.length)];

  if (operator === "+" ) {
    const [min, max] = config.addition;
    const a = randInt(min, max);
    const b = randInt(min, max);
    return { a, b, operator, answer: a + b };
  }

  if (operator === "−") {
    const [min, max] = config.subtraction!;
    let a = randInt(min, max);
    let b = randInt(min, max);
    if (a < b) [a, b] = [b, a];
    return { a, b, operator, answer: a - b };
  }

  // multiplication
  const [rangeA, rangeB] = config.multiplication!;
  const a = randInt(rangeA[0], rangeA[1]);
  const b = randInt(rangeB[0], rangeB[1]);
  return { a, b, operator: "×", answer: a * b };
}

export default function MathGame() {
  const [grade, setGrade] = useState<Grade>(1);
  const [problem, setProblem] = useState<Problem>(() => generateProblem(1));
  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGradeChange = useCallback((g: Grade) => {
    setGrade(g);
    setProblem(generateProblem(g));
    setUserAnswer("");
    setSubmitted(false);
    setCorrect(0);
    setTotal(0);
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (userAnswer.trim() === "") return;
    const isCorrect = parseInt(userAnswer, 10) === problem.answer;
    setSubmitted(true);
    setTotal((t) => t + 1);
    if (isCorrect) setCorrect((c) => c + 1);
  };

  const handleNext = () => {
    setProblem(generateProblem(grade));
    setUserAnswer("");
    setSubmitted(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (submitted) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  const isCorrect = submitted && parseInt(userAnswer, 10) === problem.answer;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-black text-center bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
        Chelsea&apos;s Math Practice
      </h1>

      <GradeSelector grade={grade} onChange={handleGradeChange} />

      {/* Score */}
      {total > 0 && (
        <div className="text-center text-xl font-bold text-teal-700">
          Score: {correct} / {total} correct
        </div>
      )}

      {/* Problem card */}
      <div className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl p-8 border-2 border-green-200 text-center">
        <MathProblem problem={problem} />

        {/* Feedback */}
        {submitted && (
          <div className={`mt-4 text-2xl font-bold bounce-in ${isCorrect ? "text-green-600" : "text-pink-500"}`}>
            {isCorrect ? "Correct!" : `Incorrect — the answer is ${problem.answer}`}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex flex-col gap-4">
        <input
          ref={inputRef}
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={submitted}
          placeholder="Type your answer..."
          className="w-full rounded-xl border-3 border-green-300 px-5 py-4 text-2xl font-medium text-indigo-900 placeholder-green-300 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          autoFocus
        />

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-gradient-to-r from-green-500 to-teal-500 px-6 py-3 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
