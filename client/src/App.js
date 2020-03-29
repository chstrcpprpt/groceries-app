import React from 'react';

import './App.css';

import Navbar from './components/Navbar';
import TabPanel from './components/TabPanel/TabPanel';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { teal, deepPurple } from '@material-ui/core/colors';

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

function App() {
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
