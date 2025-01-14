import { Blog } from "./pages/Blog.tsx";
import { SignUp } from "./pages/SignUp.tsx";
import { Login } from "./pages/Login.tsx";
import { RouteObject, useLoaderData} from "react-router-dom";
import {QueryClient, HydrationBoundary, dehydrate} from '@tanstack/react-query'
import { getPosts } from "./api/posts.ts";
import { userDetails } from './api/userAuth.ts'
import { PostData } from "./types.ts";


export const routes: RouteObject[] = [
    {
        path: '/',
        loader: async () => {
            // custom loader
            const queryClient = new QueryClient()
            // setup default query params
            const author =''
            const sortBy ='createdAt'
            const sortOrder = 'descending'
            // get the data once
            const posts = await getPosts({author, sortBy, sortOrder})
            await queryClient.prefetchQuery({
                queryKey: ['posts',{author,sortBy,sortOrder}],
                queryFn: () => posts // return the default state on first load
            })

            // get the authorIds 
            const uniqueAuthors = posts
                .map((post:PostData) => post.author)
                .filter((value,index,array) => array.indexOf(value) ===index)

            // get the userDetails for the authors
            for (const userId of uniqueAuthors) {
                await queryClient.prefetchQuery({
                    queryKey: ['users', userId],
                    queryFn: () => userDetails(userId)
                })
            }
            // get data in serialisable format ie. dehydrate
            return dehydrate(queryClient)
        },
        Component() {
            const dehydratedState = useLoaderData()
            return (
                // hydrate component with state
                <HydrationBoundary state={dehydratedState}>
                    <Blog />
                </HydrationBoundary>
            )

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