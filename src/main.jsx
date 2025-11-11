import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Router/Route";
import AuthProvider from "./Provider/AuthProvider";
import { HeadProvider } from "react-head";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      <AuthProvider>
        <HeadProvider>
        <RouterProvider router={router}></RouterProvider>
            </HeadProvider>
      </AuthProvider>

  </StrictMode>
);
