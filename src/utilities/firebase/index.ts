import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  isSupported,
  Messaging,
} from 'firebase/messaging';
import { getNotificationTokenApi } from '@/services/notification.service';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

let messaging: Messaging | null = null;

async function initMessaging() {
  try {
    if (messaging) {
      console.log('Firebase Messaging already initialized');
      return;
    }

    if (await isSupported()) {
      messaging = getMessaging(app);
      console.log('✅ Firebase Messaging initialized');
    } else {
      console.warn('🚫 FCM not supported in this browser/environment');
      return;
    }

    if (!messaging) {
      console.error('🚫 Messaging is not initialized');
      return;
    }

    // Register service worker for Firebase messaging
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    const requestPermissionAndToken = async () => {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        try {
          const currentToken = await getToken(messaging!, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
          });

          if (currentToken) {
            console.log('FCM Token:', currentToken);
            // Send token to backend
            await getNotificationTokenApi(currentToken);
          } else {
            console.log('No registration token available.');
          }
        } catch (err) {
          console.error('Error retrieving token: ', err);
        }
      } else if (permission === 'denied') {
        console.warn('User denied notifications.');
      } else {
        console.warn('Permission dismissed.');
      }
    };

    requestPermissionAndToken();
  } catch (error) {
    console.error('Error initializing Firebase messaging: ', error);
  }
}

export { messaging, initMessaging };
