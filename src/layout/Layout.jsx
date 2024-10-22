import { Card } from "../components/ui/card";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = (showFooter) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 ">
      <Card className="flex flex-col items-center min-h-screen">
        <Outlet />
        <Footer />
      </Card>
    </div>
  );
};

export default Layout;
