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
        'brand-brown': '#110a06',
        'brand-marquee': '#b79d8b',
        'slide-1': '#985528',
        'slide-2': '#d96017',
        'slide-3': '#de634c',
      },
      fontFamily: {
        noto: ['"Noto Sans"', 'sans-serif'],
        oswald: ['"Oswald"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
