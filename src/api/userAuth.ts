import { LoginDetails } from "../types.ts"

export const signUp = async({username, password}: LoginDetails) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username, password
        })
    })

    if (!res.ok) {
        throw new Error(`failed to sign up`)
    }
    return await res.json() 
}

export const login = async({username, password}: LoginDetails) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username, password
            })
        }
    )
    if (!res.ok) {
        throw new Error(`login failed, is the username/password correct?`)
    }
    return await res.json()
}

export const userDetails = async(userId: string) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        { 
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
    )
    if (!res.ok) {
        throw new Error(`unable to fetch user details`)
    }
    return await res.json()
}