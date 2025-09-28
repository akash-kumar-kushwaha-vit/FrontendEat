import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            
                <StoreContextProvider>
                    <App />
                </StoreContextProvider>
            
        </StrictMode>
    );
} else {
    console.error("Root element not found");
}
