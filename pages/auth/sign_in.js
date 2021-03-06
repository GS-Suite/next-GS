import React from 'react';
import {
    Avatar, Button, CssBaseline,
    TextField, FormControlLabel,
    Checkbox, Link, Grid, Box,
    Typography, CircularProgress,
    Backdrop
} from '@material-ui/core';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../constants";
import { useRouter } from "next/router";
import theme from "../../styles/theme";
import UsernameValidator from "../../components/field_validators/usernameValidator";
import PasswordValidator from "../../components/field_validators/passwordValidator";
import Fade from "@material-ui/core/Fade";
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
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
  }));
  

export default function SignIn () {
    let router = useRouter()
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState("");
    const links = [
        {
            "label": "Sign Up",
            "link": "/auth/sign_up"
        }
    ];

    function formValidator () {
        //// Validate the fields
        if (!UsernameValidator(username)) {
            setErrorMessage("Username must contain letters, numbers, underscores, hyphens only");
            return false;
        }
        else if (!PasswordValidator(password)) {
            setErrorMessage("Password length must be greater than 9");
            return false;
        }
        setErrorMessage("");
        return true;
    }

    let signInAPI = (event) => {
        setLoading(true);
        if (formValidator()){
            //// Sign In
            console.log("sign in");
            axios.post(
                API_BASE_URL + "/sign_in/",
                {
                    "username" : username,
                    "password" : password
                }).then(response => {
                    console.log(response.data.token);
                    if(response.data.success == true){
                        localStorage.setItem("token", response.data.token);
                        setErrorMessage("")
                        router.push("/dashboard");
                    } else {
                        setErrorMessage("Invalid username or password")
                        return false;
                    }
                }
            ).catch(function(error){
                return false;
            });
        }
        setLoading(false);
        event.preventDefault();     
    }


    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            router.push("/dashboard");
        }
    }), ["*"];
    

    return (
        loading ? (
            <div>
                <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        ) : (
            <Fade in out>
                <>
                    <NavBar title="Sign In" links={links} />
                    <Container component="main" maxWidth="xs">
                        <title>Sign In | GS-Suite</title>
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography variant="h4">
                                GS-Suite
                            </Typography>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign In
                            </Typography>
                            <form method="post" onSubmit={signInAPI}>
                            <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    onChange={e => setUsername(e.target.value)}
                                    name="username"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    onChange={e => setPassword(e.target.value)}
                                    id="password"
                                />
                                    <Typography color="error">
                                        {errorMessage}
                                    </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                </form>
                                <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                    Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/auth/sign_up/" variant="body2">
                                    {"Don't have an account? Sign Up!"}
                                    </Link>
                                </Grid>
                                </Grid>
                        </div>
                    </Container>
                </>
            </Fade>
        )
    )
}