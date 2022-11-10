// const CompressPlugin = require("compression-webpack-plugin"); // 파일 압축 (내장되어있어서 더이상 설치할 필요 없음)
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
  compress: true, // CompressPlugin 대체
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === "production";
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /&\.\ko$/),
    ];
    // if (prod) {
    //   plugins.push(new CompressPlugin());
    // }
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
      // module: {},
      plugins,
    };
  },
});
