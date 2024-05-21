//const destinationHost = "https://www.iwarket.com"
const destinationHost = 'https://iwarket.netlify.app'

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
  env: {
    ACCESS_TOKEN_MP: 'APP_USR-4128705031394975-102715-7eb2250f00d197dce296703c08a194de-348846213',
    //ACCESS_TOKEN_MP: 'TEST-4128705031394975-102715-1fcc9bea265dc1b7d8cb133ee1b1cf52-348846213',
    //NEXT_PUBLIC_API: 'http://localhost:3000/api',
    //NEXT_PUBLIC_API: 'https://www.iwarket.com/api',
    NEXT_PUBLIC_API: 'https://iwarket.netlify.app',
    MONGODB_KEY: 'mongodb+srv://nezzed:SfMzJUMxpuGZUZ64@ecommerce.9mipi43.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce',
    CLOUDINARY_API_SECRET: 'tC5yHp3VZH6VaLH4ObPo0AaijUM',
    CLOUDINARY_API_KEY: '279418967459214',
    CLOUDINARY_CLOUD_NAME: 'edata',
    JWT_USER_AUTH_KEY: 'ncajnvabcajaksvcacavaasfagahjaikcaklsaljcla',
    FRONTEND_HOST: 'https://iwarket.netlify.app'
    //FRONTEND_HOST: 'https://www.iwarket.com',
    //FRONTEND_HOST: 'http://localhost:3000'
  },
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
            value: 'https://iwarket.netlify.app'
            //value: 'https://iwarket.com https://www.iwarket.com'
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
    path: 'https://res.cloudinary.com/edata/'
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
