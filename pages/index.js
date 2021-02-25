import { ThemeProvider } from '@material-ui/core/styles';
import styles from '../styles/home.module.css'
import { useRouter } from "next/router";
import theme from "../styles/theme";
import { useEffect } from "react";
import {
  Typography
} from "@material-ui/core";
import React from "react";


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/auth/sign_in");
  }), []

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <Typography>
            Index page
        </Typography>
      </div>
    </ThemeProvider>
  )
}


/*
const Appbar = function () {
  
  return (
    <div>
      <AppBar position="static" className={classes.root} style={{ background: '#2E3B55' }}>
        <Toolbar variant="regular">
          <WbIncandescentIcon className={classes.icon} />
          
          <Link href="/go_to">
            <Button variant="contained" className={classes.button} style={{ background: '#FFFFFF' }}>Access Suite</Button>
          </Link>
          <Button variant="contained" className={classes.button} style={{ background: '#FFFFFF' }}>Sign Up</Button>
        </Toolbar>
      </AppBar>
    </div >
  );
}*/