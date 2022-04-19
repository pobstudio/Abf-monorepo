const withTM = require('next-transpile-modules')([
  '@abf-monorepo/protocol',
  '@abf-monorepo/types',
]);

module.exports = withTM({
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
});
