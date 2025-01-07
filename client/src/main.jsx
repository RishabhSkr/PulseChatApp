import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { CssBaseline } from '@mui/material'
import {Provider} from 'react-redux';
import store from './redux/store.js'


const handleContextMenu = (e) => {
  // Allow regular context menu for text operations
  const selection = window.getSelection().toString();
  if (!selection && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    // Prevent context menu only on non-text elements
    e.preventDefault();
  }
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <CssBaseline />
        <div onContextMenu={handleContextMenu}>
          <App />
        </div>
      </HelmetProvider>
    </Provider>
  </StrictMode>
)
