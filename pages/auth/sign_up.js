import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState, useEffect } from 'react';
import {
  CssBaseline, Typography,
  TextField, Container,
  Checkbox, Avatar, Divider,
  Button, Link, List, ListItem,
  Grid, Slide, Grow, Fade,
  CircularProgress, Backdrop
 } from '@material-ui/core';
import axios from 'axios';
import API_BASE_URL from "../../constants";
import { makeStyles } from '@material-ui/core/styles';
import NameValidator from "../../components/field_validators/nameValidator";
import UsernameValidator from "../../components/field_validators/usernameValidator";
import EmailValidator from "../../components/field_validators/emailValidator";
import PasswordValidator from "../../components/field_validators/passwordValidator";
import { useRouter } from "next/router";
import NavBar from "../../components/navBar";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    sidebarLogo: {
      display: "flex",
      justifyItems: "flex-center",
      alignItems: "center",
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(1, 0, 2),
      padding: theme.spacing(1),
      borderRadius: 6,
      boxShadow: theme.shadows[5],
      fontSize: "larger",
    },
    loading: {
      display: 'flex',
      marginTop: 50,
      justifyContent: "center",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
  }));

export default function SignUp () {

  const classes = useStyles();
  const router = useRouter();
  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password1, setPassword1] = useState(undefined);
  const [password2, setPassword2] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const links = [
      {
          "label": "Sign In",
          "link": "/auth/sign_in"
      }
  ];

  function fieldValidation(){
    console.log("validating fields")
    if (!NameValidator(firstName)) {
      setErrorMessage("Invalid first name");
      return false;
    } else if (!NameValidator(lastName)) {
      setErrorMessage("Invalid last name");
      return false;
    } else if (!UsernameValidator(username)) {
      setErrorMessage("Username must contain letters, numbers, underscores, hyphens only");
      return false;
    } else if (!EmailValidator(email)) {
      setErrorMessage("Invalid email address");
      return false;
    } else if (!PasswordValidator(password1)) {
      setErrorMessage("Password length must be greater than 9");
      return false;
    } else if (password1 != password2) {
      setErrorMessage("Passwords do not match!");
      return false;
    }
    else {
      setErrorMessage("");
      return true;
    }
  }

  let signUpAPI = (e) => {
    setLoading(true);
    if (fieldValidation()){
      const data = {
        "first_name": firstName,
        "last_name": lastName,
        "username": username,
        "email": email,
        "password": password1,
      }
      axios.post(
        API_BASE_URL + "/sign_up/", data
      ).then((response) => {
        if(response.status === 200){
          console.log(response);
          if (response.status == 200 ){
            setLoading(false);
            router.push("/auth/sign_in");
          }
        }
      }).catch(function(error){
        if (error.message === "Request failed with status code 409") {
          setErrorMessage("An account with that username already exists!")
        }
      });
    }
    setLoading(false);
    e.preventDefault();
  }

  return (
    <Fade in={true} timeout={500}>
      <>
        <NavBar title="Sign Up" links={links} />
        <Container component="main" maxWidth="xs">
            <title>Sign Up | GS-Suite</title>
          <CssBaseline />
            <div className={classes.paper}>
                    <Fade in={true} timeout={600}>
                      <Typography variant="h4">
                        GS-Suite
                      </Typography>
                    </Fade>
                    <Fade in={true} timeout={600}>
                      <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                      </Avatar>
                    </Fade>
                    <Grow in={true} timeout={800}>
                      <Typography component="h1" variant="h5">
                        Create a New Account
                      </Typography>
                    </Grow>
                    <form method="POST" onSubmit={signUpAPI}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Grow in={true} timeout={900}>
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="first_name"
                                label="First Name"
                                name="first_name"
                                autoFocus
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                          </Grow>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Grow in={true} timeout={1000}>
                            <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              id="last_name"
                              label="Last Name"
                              name="last_name"
                              onChange={(e) => setLastName(e.target.value)}
                              />
                          </Grow>
                        </Grid>
                      </Grid>
                      <Grow in={true} timeout={1100}>
                        <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="username"
                              label="Username"
                              name="username"
                              onChange={(e) => setUsername(e.target.value)}
                          />
                      </Grow>
                      <Grow in={true} timeout={1200}>
                        <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              onChange={(e) => setEmail(e.target.value)}
                          />
                      </Grow>
                      <Grow in={true} timeout={1300}>
                        <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password1"
                              onChange={(e) => setPassword1(e.target.value)}
                            />
                      </Grow>
                      <Grow in={true} timeout={1400}>
                        <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Confirm Password"
                              type="password"
                              id="password2"
                              onChange={(e) => setPassword2(e.target.value)}
                            />
                      </Grow>
                      <Typography color="error">
                        {errorMessage}
                      </Typography>
                      <Grow in={true} timeout={1500}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >Sign Up
                          </Button>
                        </Grow>
                        <Grow in={true} timeout={1600}>
                          <Container>
                            <Grid container>
                              <Grid item xs>
                                <Link href="/auth/sign_in" variant="body2">
                                  Already have an account? Sign In
                                </Link>
                              </Grid>
                            </Grid>
                          </Container>
                        </Grow>
                </form>
                <div>
                    <Backdrop className={classes.backdrop} open={loading} onClick={() => {setLoading(false)}}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
              </div>
            </Container>
          </>
    </Fade>           
  );
}
