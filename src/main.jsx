import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./components/pages/Home.jsx";
import Statistic from "./components/pages/Statistic.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

const THEME = createTheme({
  typography: {
    fontFamily: `"DM Sans", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/statistic", element: <Statistic /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={THEME}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
