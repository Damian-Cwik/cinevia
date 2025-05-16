
const LoginForm = ({submitHandler}) => {

   return (
      <form onSubmit={submitHandler}>
         <div className="box">
            <label htmlFor="email" className="label">Email</label>
            <input type="email" name="email" id="email" className="input" />
         </div>

         <div className="box"> 
            <label htmlFor="password" className="label">Hasło</label>
            <input type="password" name="password" id="password"  className="input"/>
         </div>

         <button type="submit" className="submitButton">Zaloguj się</button>
      </form>
   )

}

export default LoginForm;