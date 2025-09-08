
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');


// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCI70AlyA6A2qYl3OSv2d9ZTfhSrUpvFWU",
  authDomain: "videostreaming-730d4.firebaseapp.com",
  projectId: "videostreaming-730d4",
  storageBucket: "videostreaming-730d4.appspot.com",
  messagingSenderId: "489943413452",
  appId: "1:489943413452:web:bc35b4e8664d53d5f8c869",
  measurementId: "G-XGR7QTZR02"
});


// Retrieve Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  
  // Use actual notification data from payload
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message',
    icon: '/firebase-logo.png'
  };
  
  
  return self.registration.showNotification(notificationTitle, notificationOptions)
    .then(() => {
    })
    .catch((error) => {
      console.error('❌ Error displaying notification:', error);
    });
});