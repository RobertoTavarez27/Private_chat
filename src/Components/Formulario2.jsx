import './Formulario.css';
import { useState } from 'react';
import { auth} from './firebase.js';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

export const Formulario2 = () => {
  const [action, setAction] = useState("Login");
  const [err,setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    try{
    await signInWithEmailAndPassword(auth, email, password)
    navigate("/")
  }
    catch(err){
    setErr(true);
    }
  }
  const handleActionChange = (newAction) => {
    setAction(newAction);
  }
  return (
    <section>
      <form className='Formulario' onSubmit={handleSubmit}>
        <div className='header'>
          <div className="text">{action}</div>
          <div className='underline'></div>
        </div>
        <input type="email"  placeholder='E-Mail' />
        <input type="password"  placeholder='Password' />
        {action === "Login" && (
          <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>
        )}
        <div className="submit-container">
          <Link to="/Formulario"><div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => handleActionChange("Sign Up")}
          >
            Sign Up
          </div>
          </Link>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => handleActionChange("Login")}
          >
            Login
          </div>
        </div>
        <button className="Go" type="submit">Go!</button>
      {err && <p>Ups! Something Went Wrong!</p>}
      </form>
    </section>
  )
}