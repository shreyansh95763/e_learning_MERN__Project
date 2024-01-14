import {useContext, createContext, useState, useEffect} from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children })=>{
    const [token,setToken ] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [services,setServices] = useState("");

    const storeTokenInLs=(serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem("token",serverToken);
    }

    let isLoggedIn = !!token;
    console.log("Token : ",token);
    console.log("is Logged IN : ",isLoggedIn);

    const UseLogout = ()=>{
        setToken("");
        // return localStorage.removeItem('token');
        return localStorage.clear();
    }
    // JWT Authorization of user
    const userAuthorization= async() =>{
        try{
            const respone = await fetch("http://localhost:5000/user",{
                method:"GET",
                headers:{
                    Authorization : `Bearer ${token}`,
                },
            });
            if(respone.ok){
                const data = await respone.json();

                console.log("user data : ",data);
                setUser(data.userData);
            }
    
        }
        catch(error){
            console.error("Error to fetching the data");
        }
    };
    
    const getServiceData = async () =>{
        try{
            const response = await fetch('http://localhost:5000/service',{
                method:"GET",
            });
            if(response.ok){
                const service = await response.json();
                setServices(service.data);
            }
            console.log("Services : ",response);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getServiceData();
        userAuthorization();
    },[]);
    return <AuthContext.Provider value={{ isLoggedIn,storeTokenInLs ,UseLogout, user, services}}>
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