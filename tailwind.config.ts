import type { Config } from "tailwindcss";
import {content, plugin} from "flowbite-react/tailwind";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'DEFAULT': '#675D50',
        },
        secondary: {
          'DEFAULT': '#A9907E',
        },
        tertiary: {
          'DEFAULT': '#ABC4AA',
        }
      },
    },
  },
  plugins: [
    plugin(),
  ],
} satisfies Config;
