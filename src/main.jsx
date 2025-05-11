// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import { store } from './store.tsx'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import {ThemeProvider} from './context/themeContext.tsx'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
<Provider store={store}>
  <ThemeProvider>
     <App />
  </ThemeProvider>
  </Provider>
</BrowserRouter>
  
)
