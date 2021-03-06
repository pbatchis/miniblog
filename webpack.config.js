var path = require("path");

module.exports = {
  entry: "./src/main/js/index.js",
  output: {
    path: __dirname,
    filename: "./src/main/resources/static/js/bundle.js",
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, "."),
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
    ],
  },
  devtool: "source-map",
};
