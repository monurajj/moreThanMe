export interface SpecialDay {
  name: string;
  message: string;
  hindiMessage?: string;
  month: number; // 0-11 (January = 0)
  date: number; // 1-31
  colors: {
    primary: string; // Left color
    middle: string; // Middle color
    secondary: string; // Right color
    text: string; // Text color
    accent: string; // Accent color for buttons/borders
  };
  emoji: string;
  flowerColors?: string[]; // Colors for falling flowers
}

export const specialDays: SpecialDay[] = [
  {
    name: "Republic Day",
    message: "Happy Republic Day",
    hindiMessage: "जय हिन्द!",
    month: 0, // January
    date: 26,
    colors: {
      primary: "#FF9933", // Saffron
      middle: "#FFFFFF", // White
      secondary: "#138808", // Green
      text: "#000080", // Navy Blue
      accent: "#000080",
    },
    emoji: "🇮🇳",
    flowerColors: ["#FF9933", "#FFFFFF", "#138808"],
  },
  {
    name: "Independence Day",
    message: "Happy Independence Day",
    hindiMessage: "जय हिन्द!",
    month: 7, // August
    date: 15,
    colors: {
      primary: "#FF9933", // Saffron
      middle: "#FFFFFF", // White
      secondary: "#138808", // Green
      text: "#000080", // Navy Blue
      accent: "#000080",
    },
    emoji: "🇮🇳",
    flowerColors: ["#FF9933", "#FFFFFF", "#138808"],
  },
  {
    name: "Gandhi Jayanti",
    message: "Gandhi Jayanti",
    hindiMessage: "बापू को नमन",
    month: 9, // October
    date: 2,
    colors: {
      primary: "#FF6B35", // Orange
      middle: "#F7F7F7", // Light Gray
      secondary: "#4A90E2", // Blue
      text: "#2C3E50", // Dark Blue
      accent: "#FF6B35",
    },
    emoji: "🕊️",
    flowerColors: ["#FF6B35", "#F7F7F7", "#4A90E2"],
  },
  {
    name: "Diwali",
    message: "Happy Diwali",
    hindiMessage: "दीपावली की शुभकामनाएं",
    month: 9, // October (can vary, but typically October-November)
    date: 31, // This is approximate - Diwali date varies each year
    colors: {
      primary: "#FFD700", // Gold
      middle: "#FFA500", // Orange
      secondary: "#FF6347", // Red
      text: "#8B4513", // Brown
      accent: "#FFD700",
    },
    emoji: "🪔",
    flowerColors: ["#FFD700", "#FFA500", "#FF6347"],
  },
  {
    name: "Holi",
    message: "Happy Holi",
    hindiMessage: "होली की शुभकामनाएं",
    month: 2, // March (can vary)
    date: 25, // This is approximate - Holi date varies each year
    colors: {
      primary: "#FF1493", // Pink
      middle: "#00FF00", // Green
      secondary: "#0000FF", // Blue
      text: "#4B0082", // Indigo
      accent: "#FF1493",
    },
    emoji: "🎨",
    flowerColors: ["#FF1493", "#00FF00", "#0000FF", "#FFFF00"],
  },
];

/**
 * Get the special day for today, if any
 */
export function getTodaySpecialDay(): SpecialDay | null {
  const today = new Date();
  const month = today.getMonth();
  const date = today.getDate();

  return (
    specialDays.find((day) => day.month === month && day.date === date) || null
  );
}

/**
 * Check if today is a special day
 */
export function isTodaySpecialDay(): boolean {
  return getTodaySpecialDay() !== null;
}
