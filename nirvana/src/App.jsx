import { useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";

const App = () => {
  const location = useLocation();

<<<<<<< Updated upstream
  const isLoginPage = location.pathname === "/login";
  if (isLoginPage) {
    return <AppRoutes />;
=======
  function handleLoginSuccess() {
    sessionStorage.setItem('nirvana_logged_in', 'true');
    setIsLoggedIn(true);
  } 

  function handleLogout() {
    sessionStorage.removeItem('nirvana_logged_in');
    setIsLoggedIn(false);
>>>>>>> Stashed changes
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;
