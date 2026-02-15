"use client";

interface StuckThresholdInputProps {
  value: number;
  onChange: (v: number) => void;
}

export default function StuckThresholdInput({
  value,
  onChange,
}: StuckThresholdInputProps) {
  return (
    <div className="flex items-center gap-2 justify-center text-sm">
      <label className="text-purple-700 font-medium">提示延遲：</label>
      <input
        type="number"
        min={1}
        max={30}
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (v >= 1 && v <= 30) onChange(v);
        }}
        className="w-16 rounded-lg border-2 border-purple-300 px-2 py-1 text-center font-bold text-purple-700 focus:border-purple-500 focus:outline-none"
      />
      <span className="text-purple-700 font-medium">秒</span>
    </div>
  );
}
