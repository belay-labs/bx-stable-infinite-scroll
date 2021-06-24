const CopyPlugin = await import("copy-webpack-plugin");
const path = await import("path");
const merge = await import("webpack-merge");
const common = await import("./webpack.common.js");

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
