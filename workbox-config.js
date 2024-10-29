module.exports = {
  globDirectory: "build/",
  globPatterns: [
    "**/*.{html,js,css,png,jpg,svg}"
  ],
  swDest: "build/service-worker.js",
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
        },
      },
    },
    {
      urlPattern: /\.(?:js|css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
        },
      },
    },
    {
      // Maneja archivos HTML con NetworkFirst
      urlPattern: /.*\.html$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'html-cache',
        expiration: {
          maxEntries: 20,
        },
      },
    },
  ],
};
