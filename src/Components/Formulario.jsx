import './Formulario.css';
import { useState } from 'react';
import Add from "./agregar.png";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth,db, storage } from './firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {  Link } from "react-router-dom";

export const Formulario = () => {
  const [action, setAction] = useState("Sign Up");
  const [err,setErr] = useState(false)
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try{
    const res = await createUserWithEmailAndPassword (auth,email,password);
    //Create a unique image name
    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          //Update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          //create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          //create empty user chats on firestore
          await setDoc(doc(db, "usersChats", res.user.uid), {});
        } catch (err) {
          console.log(err);
          setErr(true);
          setLoading(false);
        }
      });
    });
  }catch (err) {
    setErr(true);
    setLoading(false);
  }
};
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
        <input type="text"  placeholder='Username' />
        <input type="email" placeholder='E-Mail' />
        <input type="password"  placeholder='Password' />
        <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => handleActionChange("Sign Up")}
          >
            Sign Up
          </div>
          <Link to="/Formulario2"> <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => handleActionChange("Login")}
          >
            Login
          </div>
          </Link>
        </div>
        <button className="Go" type="submit" disabled={loading}>Go!</button>
        {loading && "Uploading and compressing the image please wait..."}
      {err && <p>Ups! Something Went Wrong!</p>}
      </form>
    </section>
  )
  }
