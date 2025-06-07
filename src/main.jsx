// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store.tsx'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/themeContext.tsx'

// ⬇️ Render the app
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)

// ✅ Register the service worker for Firebase Messaging
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('✅ Service Worker registered with scope:', registration.scope);
    })
    .catch((err) => {
      console.error('❌ Service Worker registration failed:', err);
    });
}
