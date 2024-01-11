import {useContext, createContext, useState} from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children })=>{
    const [token,setToken ] = useState("");
    
    const storeTokenInLs=(serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem("token ",serverToken);
    }

    let isLoggedIn = !!token;
    console.log("Token : ",token);
    console.log("is Logged IN : ",isLoggedIn);

    const UseLogout = ()=>{
        setToken("");
        // return localStorage.removeItem("token");
        return localStorage.clear();
    }
    return <AuthContext.Provider value={{ isLoggedIn,storeTokenInLs ,UseLogout}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () =>{
    const AuthContextValue = useContext(AuthContext);
    if(!AuthContextValue){
        throw new console.error("Not getting/used any respone from provider")
    }
    return AuthContextValue
}