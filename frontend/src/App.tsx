import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import About from "./pages/About";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/contact",
    element: <Contact />
  },
]);

export default function DashboardPage() {
  return (
    <RouterProvider router={router} />
  )
}
