import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <Footer />
      <Outlet />
    </div>
  );
};

export default Layout;
