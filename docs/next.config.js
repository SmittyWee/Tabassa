const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withTM = require("next-transpile-modules")(
  [
    "@tabassa/islamic-date"
  ]
);

module.exports = withPlugins([withTM(), withImages], {
  webpack: (config) => {
    // custom webpack config
    return config;
  },
  images: {},
});
