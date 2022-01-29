import { useState, useEffect } from "react";
import useAuth from "../contexts/Auth";
import logo from "../assets/imgs/britam-logo.png";
import { Link, Redirect } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from 'firebase/auth'

import "../assets/styles/login.css";

function ForgotPassword() {
  let [isLogin, setLogin] = useState(false);

  let { setCurrentUser } = useAuth();

  const auth = getAuth()

  useEffect(() => {
    const loggedIn = Number(localStorage.getItem("loggedIn"));
    if (loggedIn === 1 || loggedIn === 2 || loggedIn === 3 || loggedIn === 4) {
      setCurrentUser(loggedIn);
      setLogin(loggedIn);
    }
    document.title = "Britam - With you every step of the way";
  });

  const handleResetPassword = (event) => {
    event.preventDefault()
    console.log("started")
    sendPasswordResetEmail(auth, event.target.email.value)
      .then(() => {
        console.log('Password reset email sent')
      })
      .catch((error) => {
        console.log(error)
      })
      console.log("Ended")
  }

  if (isLogin) return <Redirect to={{ pathname: "/supervisor-dashboard" }} />;

  return (
    <div className="auth-wrapper">
      <img src={logo} alt="Britam" />
      <form onSubmit={handleResetPassword}>
        <p>Forgot Password?</p>
        <p id="enter">Enter your e-mail address to reset your password</p>
        <div className="login-inputs">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            name=""
            id="email"
            required
          />
        </div>

        <input
          type="submit"
          id="forgotSubmit"
          className="btn btn-primary cta"
          value="Submit"
        />

        <Link to="/login" id="forgotLink">
          <p id="forgotRemember">Remember password? Login</p>
        </Link>
      </form>
    </div>
  );
}

export default ForgotPassword;
