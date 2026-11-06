import { RouterProvider } from "@tanstack/react-router";
import { router } from "./application/router";
import "./style.css";

export function App() {
  return <RouterProvider router={router} />;
}
