import { LoginDetails } from "../types.ts"

export const signUp = async(loginDetails: LoginDetails) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            loginDetails
        })
    })

    if (!res.ok) {
        throw new Error(`failed to sign up`)
    }
    return await res.json() 
}

export const login = async(loginDetails: LoginDetails) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                loginDetails
            })
        }
    )
    if (!res.ok) {
        throw new Error(`login failed, is the username/password correct?`)
    }
    return await res.json()
}
