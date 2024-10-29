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
    // Cache para la lista de productos
    {
      urlPattern: /https:\/\/backend-c-r-production\.up\.railway\.app\/products\//,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'products-api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 minutos
        },
        networkTimeoutSeconds: 3,
      },
    },
    // Cache para el detalle de productos
    {
      urlPattern: /https:\/\/backend-c-r-production\.up\.railway\.app\/products\/\d+$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'product-detail-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60,
        },
      },
    },
    // Cache para las categorías de productos
    {
      urlPattern: /https:\/\/backend-c-r-production\.up\.railway\.app\/products\/categories\/getAll/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'categories-cache',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 24 * 60 * 60, // 1 día
        },
      },
    },
    // Cache para productos por categoría
    {
      urlPattern: /https:\/\/backend-c-r-production\.up\.railway\.app\/products\/categoria\/\d+/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'category-products-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60,
        },
      },
    },
    // Cache para detalles de usuario
    {
      urlPattern: /https:\/\/backend-c-r-production\.up\.railway\.app\/users\/\d+/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'user-details-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 5 * 60,
        },
      },
    },
  ],
};
