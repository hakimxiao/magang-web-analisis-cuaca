import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getCurrentDateTime(): string {
  const now = new Date();
  return now.toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "medium",
  });
}

