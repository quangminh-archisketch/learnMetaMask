/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less');

const withEnv = {
  publicRuntimeConfig: {
    DEPLOY_ENV: process.env.DEPLOY_ENV,
  },
};

const nextConfig = withPlugins([
  {
    reactStrictMode: false,
    images: {
      domains: [],
    },

    compiler: {
      // ssr and displayName are configured by default
      styledComponents: true,
    },
  },

  withLess({
    // reactStrictMode: true,
    lessLoaderOptions: {},
  }),

  withEnv,
  // withRewrites,
]);

module.exports = nextConfig;
