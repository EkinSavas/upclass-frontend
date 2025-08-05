import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getAttentionColor(level: "high" | "medium" | "low"): string {
  switch (level) {
    case "high": return "bg-green-500";
    case "medium": return "bg-yellow-500";
    case "low": return "bg-red-500";
    default: return "bg-gray-500";
  }
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getRandomColor(): string {
  const colors = [
    "from-blue-500 to-purple-500",
    "from-green-500 to-blue-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-teal-500 to-green-500"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
} 