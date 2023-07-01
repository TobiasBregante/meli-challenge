const { Router } = require("next/router");

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

// Ejemplo de cómo obtener la lista de dominios de Argentina
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
  reactStrictMode: true, //Will run twice useEffect, with that been said, userProvider is going to request twice user/me
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
  trailingSlash: true,
}
