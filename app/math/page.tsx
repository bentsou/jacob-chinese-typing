import MathGame from "../components/math/MathGame";

export default function MathPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <main className="w-full max-w-3xl">
        <MathGame />
      </main>
    </div>
  );
}
