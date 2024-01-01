import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./crates/server/**/*.html"],
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
    daisyui: {
        themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: "dark", // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root", // The element that receives theme color CSS variables
    },
    safelist: process.env.NODE_ENV !== "production" ? [{ pattern: /.*/ }] : "",
    plugins: [
        require("daisyui"),
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("tailwindcss-animate"),
        iconsPlugin({ collections: getIconCollections(["lucide"]) }),
    ],
};
