import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const Status = lazy(() => import("./pages/Status"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/status/:id",
    element: <Status />,
  },
]);
