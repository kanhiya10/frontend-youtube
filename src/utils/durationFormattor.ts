// utils/formatDuration.ts
export function formatDuration(seconds: number): string {
  if (isNaN(seconds)) return "0:00";

  const totalSeconds = Math.floor(seconds);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  } else {
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }
}
