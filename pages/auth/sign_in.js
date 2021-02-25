import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../constants";
import { useRouter } from "next/router";
import theme from "../../styles/theme";


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

    let signInAPI = (event) => {
        console.log("sign in");
        axios.post(
            API_BASE_URL + "/sign_in/",
            {
                "username" : username,
                "password" : password
            }).then(response => {
                //console.log(response);
                if(response.status == 200){
                    localStorage.setItem("token", response.data.data.token);
                    router.push("/dashboard");
                }
            }
        ).catch(function(error){
            //console.log(error.message);
            return false;
        });
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
                    <form className={classes.form}>
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
                            onClick={signInAPI}
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
    )
}