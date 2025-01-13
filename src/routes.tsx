import { Blog } from "./pages/Blog.tsx";
import { SignUp } from "./pages/SignUp.tsx";
import { Login } from "./pages/Login.tsx";
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Blog />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/login',
        element: <Login />
    },
]