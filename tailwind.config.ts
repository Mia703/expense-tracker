import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryWhite: "#FFFFFF",
        primaryBlack: "#18181B",
        primaryBackground: "#F5F5F5",
        primaryGrey: "#6B7379",
      },
    },
  },
  plugins: [],
} satisfies Config;
