import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "./components/layout";
import ErrorPage from "./components/errorPage";
import Login from "./pages/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SingnUp from "./pages/signup";
import { ToastProvider } from "../toastContext";
import CreateListing from "./pages/createListing";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create",
        element: <CreateListing />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SingnUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </ToastProvider>
);
