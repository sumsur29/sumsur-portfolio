import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'signature': ['var(--font-signature)'],
        'cormorant': ['var(--font-cormorant)'],
        'devanagari': ['var(--font-devanagari)'],
      },
    },
  },
  plugins: [],
};
export default config;
