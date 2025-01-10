import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

export const Header: FC = () => {
    const [token, setToken] = useAuth()

    if (token) {
        const {sub} = jwtDecode(token)
        return (
            <div>
                Logged in  as <b>{sub}</b>
                <br  />
                <button onClick={() => setToken(null)}>Logout</button>
            </div>
        )
    }
    return (
        <div>
            <Link to='/signup'>Sign Up</Link> | <Link to='/login'>Login</Link>
        </div>
    )
}