const destinationHost = "https://iwarket.com"

const domains = {
  argentina: "ar",
  brasil: "br",
  chile: "cl",
  colombia: "co",
  ecuador: "ec",
  paraguay: "py",
  peru: "pe",
  uruguay: "uy",
  venezuela: "ve",
  bolivia: "bo",
  guyana: "gy",
  suriname: "sr",
  guayana_francesa: "gf",
  espana: "es",
  costa_rica: "cr",
  estados_unidos: "us",
  mexico: "mx",
};

const defaultDomain = domains.argentina;

module.exports = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: 'https://nezzed.com',
  //       permanent: true,
  //     },
  //   ]
  // },
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [
      // All routes from the LP
      {
        source: "/:path*",
        destination: "/:path*",
      },

      // Static files of the App
      {
        source: "/favicon.ico",
        destination: `${destinationHost}/favicon.ico`,
      },
      {
        source: "/static/:path*",
        destination: `${destinationHost}/static/:path*`,
      },
      {
        source: "/fonts/:path*",
        destination: `${destinationHost}/fonts/:path*`,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://iwarket.com https://www.iwarket.com'
          }
        ]
      }
    ];
  },
  reactStrictMode: true, //Will run twice useEffect, with that been said, userProvider is going to request twice user/me
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/saladapp/'
  },
  i18n: {
    locales: [
      domains.argentina,
      domains.brasil,
      domains.chile,
      domains.colombia,
      domains.ecuador,
      domains.paraguay,
      domains.peru,
      domains.uruguay,
      domains.venezuela,
      domains.bolivia,
      domains.guyana,
      domains.suriname,
      domains.guayana_francesa,
      domains.espana,
      domains.costa_rica,
      domains.estados_unidos,
      domains.mexico,
    ],
    defaultLocale: defaultDomain,
    localeDetection: false,
  },
  trailingSlash: false,
}
