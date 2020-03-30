import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import RegisterModal from './Register'
import SignInModal from './SignIn'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RegisterModal />
      <SignInModal />
    </div>
  )
}
