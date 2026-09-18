import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">

      <Header />

      <div className="layout-body">

        <Sidebar />

        <main className="main-content">
          {children}
        </main>

      </div>

    </div>
  );
};

export default Layout;