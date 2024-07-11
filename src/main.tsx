import React from "react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { createRoot } from "react-dom/client";
import "./fonts/font.css"

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
