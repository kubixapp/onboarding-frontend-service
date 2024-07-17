import { createBrowserRouter } from "react-router-dom";
import { LoginPage, ForgetPasswordPage, UpdatePasswordPage } from "../pages";
import { AuthProvider } from "../components";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthProvider element={<LoginPage />} />
    },
    {
        path: "/forget-password",
        element: <AuthProvider element={<ForgetPasswordPage />} />
    },
    {
        path: "/update-password",
        element: <AuthProvider element={<UpdatePasswordPage />} />
    }
])