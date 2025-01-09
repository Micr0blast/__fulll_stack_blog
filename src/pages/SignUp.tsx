import { FormEvent, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { signUp } from "../api/userAuth"

export function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const signUpMutation = useMutation({
        mutationFn: () => signUp({username, password}),
        onSuccess: () => navigate('/login'),
        onError: () => alert(`failed to sign up!`)
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        signUpMutation.mutate()
    }


    return (
        <form onSubmit={(e)=> handleSubmit(e)}>
            <Link to='/'>Back to main page</Link>
            <hr/>
            <br/>
            <div>
                <label htmlFor="create-username">Username:</label>
                <input 
                    type='text' 
                    id='create-username' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <br/>
            <div>
                <label>Password:</label>
                <input 
                    type='text'
                    id='create-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <br/>

            <input 
                type='submit'
                value={signUpMutation.isPending ? "Signing Up..." : "Sign Up"}
                disabled={!username || !password || signUpMutation.isPending}
                />
        </form>

    )
}