
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
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});