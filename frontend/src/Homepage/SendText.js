import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

// https://material-ui.com/components/text-fields/
// https://material-ui.com/components/material-icons/

const useStyles = makeStyles((theme) => ({
  text: {
    '& > *': {
      margin: theme.spacing(1),
    },
    'position': 'fixed',
    'bottom': 60,
    'width': '100%',
  },
  send: {
    'position': 'fixed',
    'bottom': 84,
    'right': 15,
    'zIndex': 1300,
  },
}));

/**
 * @return {any} jsx
 */
function SendText() {
  const classes = useStyles();

  return (
    <form>
      <TextField
        className={classes.text}
        id="outlined-basic"
        variant="outlined"
        placeholder="Send Message..."
        disabled={true}
      />
      <SendIcon
        className={classes.send}
      />
    </form>
  );
}

export default SendText;
