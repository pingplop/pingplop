#!/usr/bin/env node

import postCssPlugin from "esbuild-style-plugin";
import esbuild from "esbuild";

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";

esbuild
    .build({
        entryPoints: ["crates/server/assets/js/app.js", "crates/server/assets/css/styles.css"],
        outdir: "crates/server/static",
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
