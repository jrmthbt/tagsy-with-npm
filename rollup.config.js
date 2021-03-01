import {terser} from "rollup-plugin-terser";

export default {
    input: ['js/app.js'],
    output: [
        {file: "dist/js/app.js", format: "iife"},
        {file: "dist/min/js/app.min.js", format: "iife", plugins: [terser ()]}

    ],
}
