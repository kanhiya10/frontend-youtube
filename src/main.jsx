// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store.tsx'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/themeContext.tsx'
import {GoogleOAuthProvider} from '@react-oauth/google';

const clientId="489943413452-n33kjdhudobo4jfti2jbvoqs5tjghat9.apps.googleusercontent.com";


// ⬇️ Render the app
createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId={clientId}>
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
</GoogleOAuthProvider>
)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js', {
    updateViaCache: 'none'
  })
  .then((registration) => {
    registration.update(); // Force update
  });
}







