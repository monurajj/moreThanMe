/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Harvard Crimson - The Most Prestigious University Color
        primary: {
          50: '#fef2f2',   // Very light crimson background
          100: '#fee2e2',  // Light crimson sections
          600: '#A51C30',  // True Harvard Crimson - THE brand color
          700: '#8B1538',  // Deep crimson - hover states
          800: '#742A2A',  // Dark crimson - headers
          900: '#5B1A1A'   // Deep crimson - emphasis
        },
        // Professional Grays (like Goldman Sachs/McKinsey)
        neutral: {
          50: '#fafafa',   // Pure white backgrounds
          100: '#f4f4f5',  // Light backgrounds
          500: '#71717a',  // Secondary text
          600: '#52525b',  // Body text  
          700: '#3f3f46',  // Primary text
          800: '#27272a',  // Headers
          900: '#18181b'   // Deep text
        },
        // Donation Action Color (like successful donation sites)
        accent: {
          500: '#ea580c',  // Professional orange - donation buttons
          600: '#dc2626'   // Hover state
        }
      },
    },
  },
  plugins: [],
}; 