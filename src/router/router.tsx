import { createBrowserRouter } from "react-router-dom";
import { LoginPage, ForgetPasswordPage } from "../pages";
import { AuthProvider } from "../components";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthProvider element={<LoginPage />} />
    },
    {
        path: "/forget-password",
        element: <AuthProvider element={<ForgetPasswordPage />} />
    }
])