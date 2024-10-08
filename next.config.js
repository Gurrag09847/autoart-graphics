/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    //webpack: (config, { webpack }) => {
    //    config.plugins.push(new webpack.IgnorePlugin({
    //        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
    //    }))
//
    //    return config
    //},
};

export default config;
