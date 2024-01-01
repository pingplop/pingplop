import postCssPlugin from "esbuild-style-plugin";
import esbuild from "esbuild";

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";

esbuild
    .build({
        entryPoints: ["crates/handler/assets/js/app.js", "crates/handler/assets/css/styles.css"],
        outdir: "crates/handler/static",
        bundle: true,
        minify: true,
        plugins: [
            postCssPlugin({
                postcss: { plugins: [postcssImport, tailwindcss, autoprefixer] },
            }),
        ],
    })
    .catch(() => {
        console.error(`Build error: ${error}`);
        process.exit(1);
    });
