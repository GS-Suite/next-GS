import React from "react";
import API_BASE_URL from "../constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    Typography, Button, Container, Fade,
    AppBar, Toolbar, Backdrop, CircularProgress
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) =>
  ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    content: {
        marginTop: 20,
    }
  })
);

export default function Dashboard () {
    const router = useRouter();
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({})

    async function dashboardDetails () {
        console.log("fetching details");
        await axios.post(API_BASE_URL + "/get_user_dashboard/", {},
        {
            headers: {
                "token": localStorage.getItem("token"),
                "Access-Control_Allow-Origin": "*"
            }
        }).then((response) => {
            setUserData(response.data[0].data)
            
            localStorage.setItem("first_name", userData.first_name);
            localStorage.setItem("last_name", userData.last_name);
            localStorage.setItem("username", userData.username);
            localStorage.setItem("email", userData.email);
            localStorage.setItem("enrolled", userData.enrolled);
            localStorage.setItem("classrooms", userData.classrooms);

        }).catch(function(error){
            console.log(error.message);
        });
        setLoading(false);
    }

    const signOut = (event) => {
        console.log("sign out");
        axios.post(API_BASE_URL + "/sign_out/", {},
        {
            "headers": {
                "token": localStorage.getItem("token"),
                "Access-Control-Allow-Origin": "*"
            }
        }).then((response) => {
            //console.log(response)
        }).catch(function(error){
            console.log(error.message);
        });
        localStorage.removeItem("token");
        router.push("/auth/sign_in");
        event.preventDefault();
    }
    
    useEffect(() => {
        //console.log(localStorage.getItem("token"))
        if (localStorage.getItem("token") != null) {
            axios.post(API_BASE_URL + "/validate_token/",
            {
                "token": localStorage.getItem("token")
            }).then(response => {
                //console.log(response);
                if(response.status != 200){
                    localStorage.removeItem("token");
                    router.push("/auth/sign_in");
                }
            }
        ).catch(function(error){
            console.log(error.message);
        });

        if(loading){
            dashboardDetails();
        }
        }
    }), [];

    
    return (
        <Fade in out timeout={1000} >
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Dashboard
                        </Typography>
                        <Button 
                            color="inherit"
                        > Attendance </Button>
                        <Button 
                            color="inherit"
                            onClick={(event) => signOut(event)}
                        > Sign Out </Button>
                    </Toolbar>
                </AppBar>
                
                <Container className={classes.content}>
                    {
                        loading ? (
                            <></>
                        ) : (
                            <Typography variant="h5">
                                Welcome back, {userData.first_name}!
                            </Typography>
                        )
                    }
                </Container>
                <Backdrop className={classes.backdrop} open={loading} onClick={() => {setLoading(false)}}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </Fade>
    )
}