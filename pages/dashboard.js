import API_BASE_URL from "../constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
    Typography, Button, Container
} from "@material-ui/core";
import axios from "axios";


export default function Dashboard () {
    const router = useRouter();

    const signOut = (event) => {
        console.log("sign out");
        axios.post(API_BASE_URL + "/sign_out/",
        {
            "headers": {
                "token": localStorage.getItem("token")
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
        }
    });

    return (
        <Container>
            <Typography variant="h3">
                Dashboard
            </Typography>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={(event) => signOut(event)}
            >Sign out
            </Button>
        </Container>
    )
}