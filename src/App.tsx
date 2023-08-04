import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage";
import Home from "./pages/home/Home";
import Notification from "./pages/notification/Notification";
import { ProctectedRoutes } from "./protectedRoutes";
import UserNotification from "./pages/notification/UserNotification";
import Notifications from "./pages/admin/notificatiion";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProctectedRoutes />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/admin",
          element: <AdminPage />,
        },
        {
          path: "/notification",
          element: <Notification />,
        },
        {
          path: "/notifications",
          element: <Notifications />,
        },
        {
          path: "/notification/:id",
          element: <UserNotification />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
