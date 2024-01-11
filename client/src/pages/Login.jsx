import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const URL = "http://localhost:5000/login";
export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {storeTokenInLs} = useAuth();

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };
 
  const handleSubmit= async (e)=>{
    e.preventDefault();
    console.log(user);
    
    try{
      const response = await fetch(URL,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
      });
      console.log(response);
      if(response.ok){
        const responseData = await response.json();
        console.log("login successfull :",responseData);
        storeTokenInLs(responseData.token)
        setUser({email:"",password:""});
        alert("Login Successful !");
        navigate("/");
      }
      else{
        console.log("Invalid Login details !!");
      }
    }
    catch(error){
      console.log("Login error : " ,error);
    }
  }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">Login Now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};