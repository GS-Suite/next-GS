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
                <NavBar userData={userData} />
                <div>
                    <Container className={classes.content}>
                    {
                        loading ? (
                            <></>
                        ) : (
                            <div>
                                <Typography variant="h5">
                                    Welcome back {userData.first_name}!
                                </Typography>
                            </div>
                        )
                    }
                    </Container>
                    <Backdrop className={classes.backdrop} open={loading} onClick={() => {setLoading(false)}}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </div>
        </Fade>
    )
}