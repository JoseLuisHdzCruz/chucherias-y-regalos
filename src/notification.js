    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    
        const rawData = window.atob(base64);
        const uint8Array = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; i++) {
        uint8Array[i] = rawData.charCodeAt(i);
        }
    
        return uint8Array;
    }
    
    export async function requestNotificationPermission() {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
        const existing = await checkSubscription()
        if(existing){
            console.log('El usuario ya esta suscrito')
        }else{
            console.log('El usuario no esta suscrito')
            await subscribeUser();
        }
        } else {
        console.log('Permiso de notificación denegado');
        }
    }
    
    
    const checkSubscription = async () => {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
    
        if (subscription) {
        //console.log('El navegador ya esta suscrito', subscription)
        return subscription
        } else {
        console.log('No hay suscripción activa')
        return null;
        }
    }
    
    async function subscribeUser() {
        try {
        const vapidPublicKey = 'BMcEogUGaWPRmHO0a32ePzCjGgWio-2B8Fwn3HDKq63MYoQSMbUGqGGsuayZ-L5xqkmLvXT-7xY_mpk8sdGEGUw';
        const registration = await navigator.serviceWorker.ready;
    
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
        });
    
        await fetch("https://backend-c-r-production.up.railway.app/users/subscription-general/create", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
            "Content-Type": "application/json"
            }
        });
    
        console.log("Usuario suscrito exitosamente");
        } catch (error) {
        console.error("Error al suscribir al usuario:", error);
        }
    }
    