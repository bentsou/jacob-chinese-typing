"use client";

export type Difficulty = "entry" | "junior" | "expert";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onChange: (d: Difficulty) => void;
}

const levels: { value: Difficulty; label: string; color: string }[] = [
  { value: "entry", label: "入門", color: "bg-green-400 hover:bg-green-500" },
  { value: "junior", label: "初級", color: "bg-yellow-400 hover:bg-yellow-500" },
  { value: "expert", label: "專家", color: "bg-red-400 hover:bg-red-500" },
];

export default function DifficultySelector({
  difficulty,
  onChange,
}: DifficultySelectorProps) {
  return (
    <div className="flex gap-3 justify-center">
      {levels.map((level) => (
        <button
          key={level.value}
          onClick={() => onChange(level.value)}
          className={`px-5 py-2 rounded-full text-lg font-bold transition-all ${
            level.color
          } ${
            difficulty === level.value
              ? "ring-4 ring-white shadow-lg scale-110 text-white"
              : "opacity-60 text-white/80"
          }`}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}
