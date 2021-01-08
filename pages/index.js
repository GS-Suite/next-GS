import Head from 'next/head'

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { useRouter } from 'next/router';
import Link from 'next/link';



const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Helvetica Neue",
    ].join(','),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    margin: '6px'
  },
  button: {
    position: 'relative',
    margin: '10px'
    // alignSelf: "flex-end"
  }
}));

function apiCall(router) {

}

const Appbar = function () {
  const classes = useStyles();
  const router = useRouter()
  return (
    <div>
      <AppBar position="static" className={classes.root} style={{ background: '#2E3B55' }}>
        <Toolbar variant="regular">
          <WbIncandescentIcon className={classes.icon} />
          <ThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.title}>
              GS-Suite
            </Typography>
          </ThemeProvider>
          <Button variant="contained" className={classes.button} style={{ background: '#FFFFFF' }} onClick={
            <Link href="http://localhost:3000/login"></Link>
          }>Login</Button>
          <Button variant="contained" className={classes.button} style={{ background: '#FFFFFF' }}>Sign Up</Button>
        </Toolbar>
      </AppBar>
    </div >
  );
}


export default function Home() {

  return (
    <div>
      <Head>
        <title>GS-Suite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Appbar />
    </div >
  )
}
