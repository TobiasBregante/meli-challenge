import NextCors from 'nextjs-cors';

const CORS = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    origin: [
      'https://iwarket.com', 'https://iwarket-front.vercel.app', /^https:\/\/.*\.iwarket\.com$/, 'http://localhost:3000'
    ],
    optionsSuccessStatus: 200,
  });
};

export default CORS;