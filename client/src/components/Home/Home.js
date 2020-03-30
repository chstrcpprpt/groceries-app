import React, { useState, useEffect } from 'react';
import axios from "axios";

import { useHistory } from "react-router-dom";

import {
  getFromStorage,
  setInStorage
} from "../../utils/storage";
import APILogin from "../../APILogin";

import App from '../../App';

export default function Home() {
  const [signUpError, setSignUpError] = useState("");
  const [signInError, setSignInError] = useState("");
  const [token, setToken] = useState("");

  //check and verigy token on page load
  useEffect(() => {
    const token = getFromStorage("groceries");
    if (token) {
      //verify the token and direct to the app
      APILogin.verifyToken(token);

    } else {
      //there's no token to direct to login page
      history.push("/login");
    }

    //call signIn function
    signIn();
  });

  const signIn = () => {
    if (!token) {
      history.push("/login");
    }
  }

  return (
    <div>
      <App />
    </div>
  )
}
