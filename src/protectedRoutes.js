import Layout from "./pages/Layout/Layout";
import Login from "./pages/login/Login";

const logAuth = () => {
  const isChecked = localStorage.getItem("authToken");
  const loginFn = { isLoggedIn: isChecked ? true : false };
  return loginFn.isLoggedIn;
};

export const ProctectedRoutes = () => {
  const isAuth = logAuth();
  const userRedirect = {
    loggedIn: isAuth ? <Layout /> : <Login />,
  };
  return userRedirect.loggedIn;
};
