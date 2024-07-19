import { createBrowserRouter } from "react-router-dom";
import { LoginPage, ForgetPasswordPage, UpdatePasswordPage, RegisterPage, CreateAccountPage } from "../pages";
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
    },
    {
        path: "/register",
        element: <AuthProvider element={<RegisterPage />} />
    },
    {
        path: "/create-account",
        element: <AuthProvider element={<CreateAccountPage />} />
    }
])