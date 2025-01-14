import { Blog } from "./pages/Blog.tsx";
import { SignUp } from "./pages/SignUp.tsx";
import { Login } from "./pages/Login.tsx";
import { RouteObject, useLoaderData } from "react-router-dom";
import { getPosts } from "./api/posts.ts";
import { PostData } from "./types.ts";

function isPostData(loaderData: any): loaderData is PostData[] {
    return 'title' in loaderData[0]
}

export const routes: RouteObject[] = [
    {
        path: '/',
        loader: getPosts, 
            Component() {
                const posts = useLoaderData()
                let initialData: PostData[]
                if (isPostData(posts)) {
                    initialData = posts
                } else {
                    initialData = []
                }
                return <Blog initialData={initialData}/>
            }
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