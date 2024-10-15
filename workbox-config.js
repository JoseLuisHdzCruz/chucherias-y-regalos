module.exports = {
    globDirectory: "build/",  // Directorio donde se encuentran los archivos después de build
    globPatterns: [
      "**/*.{html,js,css,png,jpg,svg}"  // Archivos que serán cacheados (HTML, JS, CSS, imágenes)
    ],
    swDest: "build/service-worker.js",  // Dónde se generará el service worker
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,  // Cachear imágenes
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 50,  // Máximo de 50 imágenes cacheadas
          },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/,  // Cachear archivos JS y CSS
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
        },
      },
    ],
  };
  