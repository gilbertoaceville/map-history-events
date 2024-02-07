/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {}

module.exports = (phase, { defaultConfig }) => {
  if ("sassOptions" in defaultConfig)
    defaultConfig["sassOptions"] = {
      includePaths: [path.join(__dirname, "app/styles")],
      // prependData: `@import "app/styles/globals.scss";`,
    };
  const config = {
    ...defaultConfig,
    ...nextConfig,
  };

  return config;
};
