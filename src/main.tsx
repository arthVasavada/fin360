import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.css'; // Tailwind CSS styles
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* React Router for routing */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
