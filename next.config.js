module.exports = {
  reactStrictMode: true, //Will run twice useEffect, with that been said, userProvider is going to request twice user/me
  images: {
    formats: ['image/avif', 'image/webp'] // Should use avif format when posible
   }
}
