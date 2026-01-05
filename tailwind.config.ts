import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your Custom Palette
        background: "#FFF9F5", // Light warm white
        foreground: "#1A1A1A", // Soft black (Text)
        primary: {
          DEFAULT: "#D4A5A5",  // Rose Gold (Buttons/Highlights)
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#2D2D2D",  // Charcoal
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F5E6E8",  // Soft Rose (Borders/Lines)
          foreground: "#64748B",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        }
      },
      fontFamily: {
        // We can add a custom font later, e.g., 'Playfair Display' for headers
        sans: ['var(--font-inter)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;