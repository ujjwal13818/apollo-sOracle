import React from "react";
import styles from "./LS.module.css";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { getUserData, loggedIn, setLoggedIn } from "./userData";

const LS = (props) => {
  const navigateTo = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const axiosPostData = async() => {
    const postData = {
      Email: Email,
      Password: Password
    }

    await axios.post("http://localhost:4000/logsig", postData).then(res => {
      if (
        res.data != "email does not match" &&
        res.data != "user not found" &&
        res.data != "password does not match"
      ) {
        props.onSubmit(res.data);
        getUserData(res.data);
        setLoggedIn();
        navigateTo("/home");
      } else {
        alert("wrong credentials");
      }
    }).catch(console.log("something went wrong"));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // loggedIn = true;
    axiosPostData();
  }

  return (
    <body className={styles.ls_body}>
      <div className={styles.name}>
        <h1>
          <span>A</span>POLLO'S<nbsp> </nbsp>
          <span>O</span>RACLE
        </h1>
      </div>
      <div className={styles.main}>
        <div className={styles.login}>
          <form action="POST">
            <label HTMLfor="chk" className={styles.label}>
              Login
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Email"
              required
              className={styles.input}
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="Password"
              placeholder="password"
              required
              className={styles.input}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className={styles.button}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className={styles.register}>
        <p>Don't have an account?</p>

        <a href="/sign">
          <button className={styles.btn}>Sign Up </button>
        </a>
      </div>
    </body>
  );
};

export default LS;
