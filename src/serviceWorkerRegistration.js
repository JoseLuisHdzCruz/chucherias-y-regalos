// Este archivo ayuda a registrar el service worker en tu aplicación para que funcione como una PWA

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] es la dirección IPv6 de localhost.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 son considerados localhost en IPv4.
    window.location.hostname.match(
      /^127(?:\.[0-9]+){0,2}\.[0-9]+$/
    )
  );
  
  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // La URL del service worker
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // Esto es un entorno de desarrollo local
          checkValidServiceWorker(swUrl, config);
  
          // Se añade logging adicional para localhost
          navigator.serviceWorker.ready.then(() => {
            console.log(
              'Esta aplicación es servida por un service worker.'
            );
          });
        } else {
          // Registra el service worker para producción
          registerValidSW(swUrl, config);
        }
      });
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log(
                  'Nuevo contenido está disponible; por favor refresca la página.'
                );
  
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                console.log('Contenido está en caché para su uso offline.');
  
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch(error => {
        console.error('Error durante el registro del service worker:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    // Verifica si el service worker se puede encontrar.
    fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    })
      .then(response => {
        // Asegura que se reciba un service worker válido.
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          // No se encontró el service worker, probablemente sea otra aplicación. Reinicia la página.
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Service worker encontrado, procede a registrarlo normalmente.
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log(
          'No se encontró conexión a internet. La aplicación está en modo offline.'
        );
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => {
          registration.unregister();
        })
        .catch(error => {
          console.error(error.message);
        });
    }
  }
  