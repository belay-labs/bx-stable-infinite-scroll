import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import merge from "webpack-merge";
import common from "./webpack.common.js";

module.exports = merge(common, {
  entry: ["@babel/polyfill", path.join(__dirname, "src/index.tsx")],
  output: {
    path: path.resolve("lib"),
    filename: "index.jsx",
    libraryTarget: "commonjs2",
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "README.md" }],
    }),
  ],
  externals: {
    react: "react",
    reactDOM: "react-dom",
  },
});
