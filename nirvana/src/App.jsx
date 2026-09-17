import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('nirvana_logged_in') === 'true'
  );

  function handleLoginSuccess() {
    sessionStorage.setItem('nirvana_logged_in', 'true');
    setIsLoggedIn(true);
  }

  function handleLogout() {
    sessionStorage.removeItem('nirvana_logged_in');
    setIsLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <AppRoutes
        isLoggedIn={isLoggedIn}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />
    </BrowserRouter>
  );
}