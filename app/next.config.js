const withTM = require('next-transpile-modules')([
  '@abf-monorepo/protocol',
  '@abf-monorepo/types',
]);

module.exports = withTM({
  swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
    // removeConsole: true,
    // removeConsole: {
    //   exclude: ['error'],
    // },
  },
  async redirects() {
    return [
      {
        source: '/recruit',
        destination: '/train/0',
        permanent: true,
      },
    ];
  },
});
