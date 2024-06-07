const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  eslint: {
    dirs: ['components', 'constant', 'layouts', 'libs', 'pages', 'scripts', 'utils'],
  },
  images: {
    domains: ['i.scdn.co', 'raw.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.360buyimg.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/gh/:path*',
        destination: 'https://raw.githubusercontent.com/:path*',
        locale: false,
      },
      {
        source: '/jd/:path*',
        destination: 'https://img30.360buyimg.com/myjd/jfs/:path*',
        locale: false,
      },
      {
        source: '/wqcdn/:path*',
        destination: 'https://cdn.57777777.xyz/:path*',
        locale: false,
      },
      {
        source: '/alist/:path*',
        destination: 'https://alist.57777777.xyz/d/:path*',
        locale: false,
      },
    ]
  },
  typescript: { tsconfigPath: './tsconfig.json' },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})
