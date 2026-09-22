import { useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";

const App = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  // If I am on Login page, don't show Layout.
  if (isLoginPage) {
    return <AppRoutes />;
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;
 