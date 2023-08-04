import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <div style={{ width: "100vw", minHeight: "85vh", height: "auto" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
