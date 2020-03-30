import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const handleFormSubmit = () => {
  
}

export default function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Username" value={userName} />
      <TextField id="standard-basic" label="Email" value={email} />
      <TextField id="standard-basic" label="Password" value={password} />
      <TextField id="standard-basic" label="Re-enter Password" />
      <Button variant="contained" color="primary" onClick={handleFormSubmit}>
        Sign Up
      </Button>
    </form>
  );
}