// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes, type RouteObject } from 'react-router-dom';
import AppRoute from './config/app-route';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css';
import 'bootstrap';
import './scss/react.scss';
import 'bootstrap-social/bootstrap-social.css';

export function AppRouter(): React.ReactElement | null {
  const element = useRoutes(AppRoute as RouteObject[]);
  return element;
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element with id="root" was not found');
}

createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);