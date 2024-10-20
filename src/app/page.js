"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  const handleNavigateToProjectBoard = () => {
    router.push("/project-board"); // Change this path to match your actual project board route
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl text-blue-950">Welcome to the Home Page</h1>
      <button
        onClick={handleNavigateToProjectBoard}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Go to Project Board
      </button>

    </div>
  );
}

