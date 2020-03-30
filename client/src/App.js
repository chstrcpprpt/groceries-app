import React, { useEffect } from 'react';

import './App.css';

import Navbar from './components/Navbar';
import TabPanel from './components/TabPanel/TabPanel';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { teal, deepPurple } from '@material-ui/core/colors';

import { loadUser } from "./actions/authActions";

//create app theme
const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: {
      main: teal.A200,
      light: teal.A100,
      dark: teal.A700
    }
  }
});

// REDUCERS
const authInitialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null
};

function authReducer(state = authInitialState, action) {
  switch(action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT_SUCCESS":
    case "REGISTER_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

function App() {

  useEffect(() => {
    loadUser();
  })

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <TabPanel />
      </div>
    </ThemeProvider>
  );
}

export default App;
