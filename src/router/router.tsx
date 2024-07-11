import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages";
import { AuthProvider } from "../components";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthProvider element={<LoginPage />} />
    }
])