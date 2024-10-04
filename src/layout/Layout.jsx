import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = (showFooter) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
