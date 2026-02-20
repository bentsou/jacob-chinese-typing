"use client";

export type Grade = 1 | 2 | 3 | 4 | 5 | 6;

interface GradeSelectorProps {
  grade: Grade;
  onChange: (g: Grade) => void;
}

const grades: { value: Grade; label: string; color: string }[] = [
  { value: 1, label: "1st", color: "bg-green-400 hover:bg-green-500" },
  { value: 2, label: "2nd", color: "bg-teal-400 hover:bg-teal-500" },
  { value: 3, label: "3rd", color: "bg-cyan-400 hover:bg-cyan-500" },
  { value: 4, label: "4th", color: "bg-blue-400 hover:bg-blue-500" },
  { value: 5, label: "5th", color: "bg-indigo-400 hover:bg-indigo-500" },
  { value: 6, label: "6th", color: "bg-purple-400 hover:bg-purple-500" },
];

export default function GradeSelector({ grade, onChange }: GradeSelectorProps) {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {grades.map((g) => (
        <button
          key={g.value}
          onClick={() => onChange(g.value)}
          className={`px-5 py-2 rounded-full text-lg font-bold transition-all ${
            g.color
          } ${
            grade === g.value
              ? "ring-4 ring-white shadow-lg scale-110 text-white"
              : "opacity-60 text-white/80"
          }`}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
}
