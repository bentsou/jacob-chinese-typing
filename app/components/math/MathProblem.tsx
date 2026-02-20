"use client";

export interface Problem {
  a: number;
  b: number;
  operator: "+" | "−" | "×";
  answer: number;
}

interface MathProblemProps {
  problem: Problem;
}

export default function MathProblem({ problem }: MathProblemProps) {
  return (
    <div className="text-5xl font-black text-indigo-900 tracking-wide">
      {problem.a} {problem.operator} {problem.b} = ?
    </div>
  );
}
