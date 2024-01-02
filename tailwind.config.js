import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./crates/server/**/*.html", "node_modules/preline/dist/*.js"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Noto Sans Display Variable", ...fontFamily.sans],
                mono: ["JetBrains Mono Variable", ...fontFamily.mono],
            },
            colors: {
                black: "#131115",
                gray: colors.slate,
                primary: {
                    50: "#ebf9ff",
                    100: "#d2f3ff",
                    200: "#aeeaff",
                    300: "#77e0ff",
                    400: "#37cbff",
                    500: "#0aaaff",
                    600: "#0085ff",
                    700: "#006cff",
                    800: "#0059d5",
                    900: "#014fa7",
                    950: "#052349",
                },
            },
        },
    },
    safelist: process.env.NODE_ENV !== "production" ? [{ pattern: /.*/ }] : "",
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/typography"),
        require("tailwindcss-animate"),
        require("preline/plugin"),
        iconsPlugin({ collections: getIconCollections(["lucide"]) }),
    ],
};
