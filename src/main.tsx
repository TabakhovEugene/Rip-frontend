import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from "./redux/store.tsx";
import { Provider } from "react-redux";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/animals-frontend/serviceWorker.js")
            .then(res => console.log("service worker registered", res))
            .catch(err => console.log("service worker not registered", err))
    })
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
)
