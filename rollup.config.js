import babel from "rollup-plugin-babel";

export default {
  external: ["react"],
  output: {
    file: "bin/index.js",
    format: "cjs"
  },
  input: "src/index.js",
  plugins: [
    babel({
      babelrc: false,
      exclude: "node_modules/**",
      presets: [
        ["@babel/preset-env", { modules: false }],
        "@babel/preset-react"
      ]
    })
  ]
};