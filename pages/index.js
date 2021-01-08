import Head from 'next/head'

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

const theme = {
  spacing: [0, 2, 3, 5, 8],
}

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
  button: {
    position: 'relative',
    // alignSelf: "flex-end"
  }
}));


const Appbar = function () {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.root} color="transparent">
        <Toolbar variant="regular">
          <WbIncandescentIcon />
          <Typography variant="h6" className={classes.title}>
            GS-Suite
          </Typography>
          <Button mt={1} variant="contained" color="primary" className={classes.button}>Login</Button>
          <Button mt={1} variant="contained" color="primary" className={classes.button}>Sign Up</Button>
        </Toolbar>
      </AppBar>
    </div>
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
