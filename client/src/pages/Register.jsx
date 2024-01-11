import { useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const URL = "http://localhost:5000/register";
export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const navigate = useNavigate();
    const {storeTokenInLs} = useAuth();

    const handleInputEvent = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value, //[name] user for dynamic canges of the value of all field
        });
    };

    //Handle of the submission form
  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(user),
      });
      console.log("response data : ", response);

      if (response.ok) {
        const responseData = await response.json();
        alert("registration successful");
        storeTokenInLs(responseData.tiken);
        setUser({ username: "", email: "", phone: "", password: "" });
        console.log(responseData);
        navigate("/login");
      } else {
        console.log("error inside response ",);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image reg-img">
                            <img
                                src="/images/register.png"
                                alt="a nurse with a cute look"
                                width="500"
                                height="500"
                            />
                        </div>
                        {/* Registration section */}
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">registration form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={handleInputEvent}
                                        placeholder="username"
                                        id="username"
                                        autoComplete="off"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={user.email}
                                        onChange={handleInputEvent}
                                        placeholder="email"
                                        id='email'
                                        autoComplete="off"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleInputEvent}
                                        placeholder="phone"
                                        id='phone'
                                        autoComplete="off"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleInputEvent}
                                        placeholder="password"
                                        id='password'
                                        autoComplete="off"
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-submit">
                                    Register Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
};