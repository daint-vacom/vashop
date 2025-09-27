// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCsIuqEm2mlrWHDb0xBhnintqWMDYqho5w",
  authDomain: "eps-notification-f1634.firebaseapp.com",
  projectId: "eps-notification-f1634",
  storageBucket: "eps-notification-f1634.firebasestorage.app",
  messagingSenderId: "271079129946",
  appId: "1:271079129946:web:7a238ca01956cb5ef32963"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('📩 [SW] Background message received:', payload);

  // CRITICAL FIX: Enhanced message posting
  self.clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
  }).then(clients => {
    console.log('📩 [SW] Found', clients.length, 'clients');

    clients.forEach(client => {
      console.log('📩 [SW] Posting message to client:', client.url);
      client.postMessage({
        type: 'FCM_BACKGROUND_NOTIFICATION',
        payload: payload
      });
    });
  });

  // Show browser notification
  const { title, body } = payload.notification || {};
  const notificationOptions = {
    body: body || 'You have a new notification',
    icon: '/logo192.png',
    badge: '/badge-72x72.png',
    data: payload.data || {},
    requireInteraction: true,
    actions: [
      { action: 'view', title: 'View' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  self.registration.showNotification(
      title || 'New Notification',
      notificationOptions
  );
});