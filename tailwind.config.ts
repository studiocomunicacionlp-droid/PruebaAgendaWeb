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
        rose: {
          light: "#FBE4EA",
          DEFAULT: "#E9A8BE",
          medium: "#DE7CA0",
          strong: "#C23A6B",
        },
        wine: {
          DEFAULT: "#5C1832",
          dark: "#3D0F21",
        },
        ink: "#1B1417",
        cream: "#FFF9F6",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(2deg)" },
        },
      },
      boxShadow: {
        soft: "0 20px 60px -15px rgba(92, 24, 50, 0.25)",
        card: "0 10px 30px -10px rgba(27, 20, 23, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
