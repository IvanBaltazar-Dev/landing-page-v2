import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Diagnostico from './Diagnostico.jsx';
import './styles.css';

// Router mínimo (sin dependencias): /diagnostico → test; resto → landing.
const isDiagnostico = /\/diagnostico\/?$/.test(window.location.pathname);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isDiagnostico ? <Diagnostico /> : <App />}
  </React.StrictMode>
);
