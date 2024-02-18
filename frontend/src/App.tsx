import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
]);

export default function DashboardPage() {
  return (
    <RouterProvider router={router} />
  )
}
