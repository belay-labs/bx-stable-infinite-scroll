const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  entry: {
    main: ["@babel/polyfill", path.join(__dirname, "examples/src/index.tsx")],
    virtualized: [
      "@babel/polyfill",
      path.join(__dirname, "examples/src/virtualized.tsx"),
    ],
  },
  output: {
    path: path.join(__dirname, "examples/dist"),
    filename: "[name].js",
  },
  devServer: {
    port: 3001,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "**/*.yml",
          context: path.resolve(__dirname, "examples", "src"),
        },
        {
          from: "Gemfile",
          context: path.resolve(__dirname, "examples", "src"),
        },
        {
          from: "**/*.md",
          context: path.resolve(__dirname, "examples", "src"),
        },
        { from: "README.md" },
        { from: "examples/src/_layouts", to: "_layouts" },
      ],
    }),
  ],
});
