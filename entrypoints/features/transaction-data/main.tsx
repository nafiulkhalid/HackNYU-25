import React from 'react';
import ReactDOM from 'react-dom/client';
import { TransactionData } from './index.tsx';
import '@/assets/tailwind.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <TransactionData />
  </React.StrictMode>,
);
