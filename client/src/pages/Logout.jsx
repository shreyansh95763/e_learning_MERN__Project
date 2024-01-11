import { useEffect } from "react"
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";


export const Logout = () => {

    const { UseLogout } = useAuth();

    useEffect(() => {
        UseLogout();
    }, [UseLogout]);

    return <Navigate to="/login" />;
}
