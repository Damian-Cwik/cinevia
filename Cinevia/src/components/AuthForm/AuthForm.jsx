import { useState } from 'react';
import { Link } from "react-router";
import LoginForm from './LoginForm/LoginForm';
import SignInForm from './SignInForm/SignInForm';
import './AuthForm.css';


const AuthForm = () => {
   const handleLogIn = (e) => {
      e.preventDefault();
   }

   const handleSignIn = (e) => {
      e.preventDefault();
   }

   const [activeButton, setActiveButton] = useState("Zaloguj");

   return (
      <>
         <Link to="/" className="link">
            <header className="header">
               <h1 className="logo">CineVia</h1>
            </header>
         </Link>

         <div className="container">
            <h1 className="heade">Zacznij już teraz</h1>
            <div className="switchBox">
               <div className={`slider ${activeButton === "Zarejestruj" ? "right" : "left"}`}></div>

               <button
                  className={`button ${activeButton === "Zaloguj" ? "active" : ""}`}
                  onClick={() => setActiveButton("Zaloguj")}
               >
                  Zaloguj się
               </button>

               <button
                  className={`button ${activeButton === "Zarejestruj" ? "active" : ""}`}
                  onClick={() => setActiveButton("Zarejestruj")}
               >
                  Zarejestruj się
               </button>
            </div>

            {activeButton === "Zaloguj" && <LoginForm submitHandler={handleLogIn} />}
            {activeButton === "Zarejestruj" && <SignInForm submitHandler={handleSignIn} />}
         </div>
      </>

   )
}

export default AuthForm;