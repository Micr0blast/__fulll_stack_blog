import { FC } from "react";
import { Link } from "react-router-dom";

export const Header: FC = () => {
    return (
        <div>
            <Link to='/signup'>Sign Up</Link>
            <br/>
            <Link to='/login'>Login</Link>
        </div>
    )
}