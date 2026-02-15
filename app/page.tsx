import fs from "fs";
import path from "path";
import TypingGame from "./components/TypingGame";

export default function Home() {
  const filePath = path.join(process.cwd(), "doc", "sentences.txt");
  const content = fs.readFileSync(filePath, "utf-8");
  const sentences = content
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <main className="w-full max-w-3xl">
        <TypingGame sentences={sentences} />
      </main>
    </div>
  );
}
