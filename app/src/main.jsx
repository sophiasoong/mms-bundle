import React from 'react';
import { createRoot } from 'react-dom/client';

// The compiled design-system bundle (public/design-system/_ds_bundle.js) is a
// plain classic script that reads a bare `React` global and attaches its
// components to `window.ShoalterMMSDesignSystem_192af1`. Exposing our single
// npm React instance as `window.React` before loading it keeps every hook
// call (inside DS components and inside our own app) on the same dispatcher.
window.React = React;

function loadDesignSystemBundle() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '/design-system/_ds_bundle.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

loadDesignSystemBundle().then(async () => {
  const { default: App } = await import('./App.jsx');
  createRoot(document.getElementById('root')).render(<App />);
});
