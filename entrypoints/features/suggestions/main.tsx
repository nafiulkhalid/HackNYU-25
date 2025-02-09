import React from 'react';
import ReactDOM from 'react-dom/client';
import { Suggestions } from './index.tsx';
import '@/assets/tailwind.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <Suggestions />
  </React.StrictMode>,
);
