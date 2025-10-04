import React from "react";
import { createRoot } from 'react-dom/client';
import App from './components/apologies/App.tsx';
import css from './components/App.module.css';
import "modern-normalize";
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(<React.StrictMode>
    <App />
  </React.StrictMode>);

