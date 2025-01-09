import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { FC, FormEvent, useState } from "react";
import { login } from "../api/userAuth";
import { useAuth } from "../contexts/AuthContext";

export const Login: FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [, setToken]= useAuth()

    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: () => login({username, password}),
        onSuccess: (data) => {
            setToken(data.token),
            navigate('/')
        },
        onError: () => alert(`login failed`)
    })

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        loginMutation.mutate()
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Link to='/'>Back to main page</Link>
                        <hr/>
                        <br/>
            <div>
                <label>Username:</label>
                <input 
                    type='text'
                    id='login-username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
            </div>

            <div>
                <label>Password:</label>
                <input 
                    type='text'
                    id='login-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </div>
            <input 
                type='submit' 
                value={loginMutation.isPending? 'Logging in...' : 'Login'}
                disabled={!password || !username || loginMutation.isPending}
                />
        </form>
    )
}