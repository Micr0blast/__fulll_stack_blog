import { FC } from "react"
import { useQuery } from "@tanstack/react-query"
import { Header } from "../components/Header.tsx"
import { Link } from "react-router-dom"
import {Post} from "../components/Post.tsx"
import { PostData } from "../types.ts"
import { getPostById } from "../api/posts.ts"
import { userDetails } from "../api/userAuth.ts"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet-async"


interface PostDetailProps {
    postId: string
}

function truncate(str: string, max = 160) {
    if (!str) return str
    if (str.length > max) {
      return str.slice(0, max - 3) + '...'
    } else {
      return str
    }
  }

export const PostDetailView: FC<PostDetailProps> = ({postId}) => {
    const postQuery = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostById(postId)
    })

    const post: PostData = postQuery.data

    const userInfoQuery = useQuery({
        queryKey: ['users', post?.author],
        queryFn: () => userDetails(post?.author),
        enabled: Boolean(post?.author),
      })
      const userInfo = userInfoQuery.data ?? {}



    return (
        <div style={{ padding: 8 }}>
            {post && (
                <Helmet>
                    <title>{post.title} | Full Stack React Blog</title>
                    <meta name='description' content={truncate(post.contents)} />
                    <meta property='og:type' content='article' />
                    <meta property='og:title' content={post.title} />
                    <meta property='og:article:published_time' content={post.createdAt} />
                    <meta property='og:article:modified_time' content={post.updatedAt} />
                    <meta property='og:article:author' content={userInfo.username} />
                    {(post.tags ?? []).map((tag) => (
                        <meta key={tag} property='og:article:tag' content={tag} />
                    ))}
                </Helmet>
            )}
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