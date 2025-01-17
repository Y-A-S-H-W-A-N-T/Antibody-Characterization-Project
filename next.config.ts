const nextConfig = {
  webpack: (config: { module: { rules: { test: RegExp; use: string[] }[] } }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    })
    return config
  },
}
module.exports = nextConfig
