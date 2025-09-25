process.env.NODE_ENV = "production";

const webpack = require("webpack");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpackConfigProd = require("react-scripts/config/webpack.config")(
  "production"
);
const chalk = require("chalk");

const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const green = (text) => {
  return chalk.green.bold(text);
};
webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());

let theFormat = `${green("analyzing...")} ${green("[:bar]")} ${green(
  "[:percent]"
)} ${green("[:elapsed seconds]")} - imsg`;

console.log("Stat is starting.");

webpackConfigProd.plugins.push(new ProgressBarPlugin({ format: theFormat }));

webpack(webpackConfigProd, (err) => {
  console.log(err);
});

//
