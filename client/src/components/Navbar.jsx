import { NavLink } from "react-router-dom";
import './Navbar.css';
import { useAuth } from "../store/auth";

export const Navbar = () =>{
        const { isLoggedIn } = useAuth();
    return(<>
        <div className="container-nav">
           <div> </div>
            <div className="logo-container">
                <NavLink to="/" className="nav-link nav-heading">E-learning Application</NavLink>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/service">Services</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/contact">Contacts</NavLink>
                    </li>
                    {isLoggedIn?
                    <li>
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                    :<>
                    <li>
                        <NavLink className="nav-link" to="/register">Registration</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    </>
                    };
                </ul>
            </nav>
        </div>
    </>)
}