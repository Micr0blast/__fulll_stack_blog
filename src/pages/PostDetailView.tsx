import { FC, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Header } from "../components/Header.tsx"
import { Link } from "react-router-dom"
import {Post} from "../components/Post.tsx"
import { PostData } from "../types.ts"
import { getPostById } from "../api/posts.ts"
import PropTypes from "prop-types"


interface PostDetailProps {
    postId: string
}

export const PostDetailView: FC<PostDetailProps> = ({postId}) => {
    const postQuery = useQuery({
        queryKey: ['posts', postId],
        queryFn: () => getPostById(postId)
    })


    const post: PostData = postQuery.data

    useEffect(() => {
        document.title = `${post.title} | Full Stack React Blog`
    },[])


    return (
        <div>
            <Header />
            <br />
            <Link to='/'>Back to main...</Link>
            <hr />
            <br />
            {post ? <Post {...post} fullPost/>: `Post with id ${postId} not found.`}
            <br />
            
        </div>
    )
}

PostDetailView.propTypes = {
    postId: PropTypes.string.isRequired
}