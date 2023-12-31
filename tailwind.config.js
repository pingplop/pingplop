import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./crates/handler/**/*.html"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Noto Sans Display Variable", ...fontFamily.sans],
                mono: ["JetBrains Mono Variable", ...fontFamily.mono],
            },
            colors: {
                black: "#131115",
                primary: colors.blue,
            },
        },
    },
    plugins: [
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("tailwindcss-animate"),
        iconsPlugin({ collections: getIconCollections(["lucide"]) }),
    ],
};
