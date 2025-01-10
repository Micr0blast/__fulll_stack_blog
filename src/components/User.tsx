import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { userDetails } from "../api/userAuth";
import PropTypes from 'prop-types'

interface UserProps{
    userId: string
}

export const User:FC<UserProps> = ({userId}) => {

    const userDetailQuery = useQuery({
        queryKey: ['users', userId],
        queryFn: () => userDetails(userId),
    })

    const userInfo = userDetailQuery.data ?? {}

    return (
        <div>
            <strong>{userInfo?.username ?? userId}</strong>
        </div>
    )
}

User.propTypes = {
    userId: PropTypes.string.isRequired
}