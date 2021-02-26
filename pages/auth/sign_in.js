import React from 'react';
import {
    Avatar, Button, CssBaseline,
    TextField, FormControlLabel,
    Checkbox, Link, Grid, Box,
    Typography
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
  }));
  

export default function SignIn () {
    let router = useRouter()
    const classes = useStyles();
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState("");

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
        if (formValidator()){
            //// Sign In
            console.log("sign in");
            axios.post(
                API_BASE_URL + "/sign_in/",
                {
                    "username" : username,
                    "password" : password
                }).then(response => {
                    console.log(response.data.data.token);
                    if(response.status == 200){
                        localStorage.setItem("token", response.data.data.token);
                        setErrorMessage("")
                        router.push("/dashboard");
                    }
                }
            ).catch(function(error){
                //console.log(error.message);
                setErrorMessage("Invalid username or password")
                return false;
            });
        }

        event.preventDefault();        
    }


    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            axios.post(API_BASE_URL + "/validate_token/",
            {
                "token": localStorage.getItem("token")
            }).then(response => {
                //console.log(response);
                if(response.status == 200){
                    router.push("/dashboard");
                } else {
                    localStorage.removeItem("token");
                }
            }
        ).catch(function(error){
            console.log(error.message);
        });
        } else {
            //console.log("No token")
        }
    }), ["*"];
    

    return (
        <Fade in out>
            <Container component="main" maxWidth="xs">
                <title>Sign In | GS-Suite</title>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        GS-Suite
                    </Typography>
                    <Typography component="h5" variant="h5">
                        Sign In
                    </Typography>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <form onSubmit={signInAPI}>
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
                    <div>
                        <Typography color="error">
                            {errorMessage}
                        </Typography>
                    </div>
                </div>
            </Container>
        </Fade>
    )
}