import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// ⭐️ GSAP Imports (Corrected)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // ScrollTrigger is now here!
import { useGSAP } from '@gsap/react';

// Register all necessary plugins globally.
// This is essential for ScrollTrigger to work correctly in the bundled app.
gsap.registerPlugin(ScrollTrigger, useGSAP); 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);