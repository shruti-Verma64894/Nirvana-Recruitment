<<<<<<< Updated upstream
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";
=======
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
>>>>>>> Stashed changes

const App = () => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;

