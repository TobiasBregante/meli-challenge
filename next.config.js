module.exports = {
  reactStrictMode: true, //Will run twice useEffect, with that been said, userProvider is going to request twice user/me
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/saladapp/'
   }
}
