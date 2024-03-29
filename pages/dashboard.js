import React from "react";
import API_BASE_URL from "../constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    Typography, Button, Container, Fade,
    Backdrop, CircularProgress
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import NavBar from "../components/navBar"

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
    },
    profile: {
        alignItems: "center",
        padding: "default",
        alignContent: "center"
        
    },
  })
);

export default function Dashboard () {
    const router = useRouter();
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const links = [{
        "label": "Attendance",
    }];

    async function dashboardDetails () {
        console.log("fetching details");

        
    }
    
    useEffect(() => {
        if (loading) {
            axios.post(API_BASE_URL + "/get_user_dashboard/", {},
            {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                if (response.data.success != true){
                    localStorage.clear();
                    router.push("/auth/sign_in");
                } else {
                    setUserData(response.data.data)
                
                    localStorage.setItem("first_name", userData.first_name);
                    localStorage.setItem("last_name", userData.last_name);
                    localStorage.setItem("username", userData.username);
                    localStorage.setItem("email", userData.email);
                }
            }).catch(function(error){
                console.log(error.message);
            });
        }
        setLoading(false);
    }), [];

    
    return (
        loading ? (
            <Backdrop className={classes.backdrop} open={loading} onClick={() => {setLoading(false)}}>
                <CircularProgress color="inherit" />
            </Backdrop>
        ) : (
            <Fade in out timeout={1000} >
                <div>
                    <NavBar title="Dashboard" links={links} userData={userData} />
                    <div>
                        <Container className={classes.content}>
                            <div>
                                <Typography variant="h5">
                                    Welcome back {userData.first_name}!
                                </Typography>
                            </div>
                        </Container>
                    </div>
                </div>
            </Fade>
        )
    )
}