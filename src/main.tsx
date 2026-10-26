import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register service worker for offline PWA capabilities (when not in an embedded iframe)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.self === window.top) {
  window.addEventListener('load', () => {
    try {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Safe silent fallback
      });
    } catch {
      // Safe fallback
    }
  });
}

createRoot(document.getElementById('root')!).render(<App />);
