import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {WorkspaceContext} from '../Homepage';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Grid from '@material-ui/core/Grid';
// https://material-ui.com/components/drawers/
// https://material-ui.com/components/lists/
// https://material-ui.com/components/grid/
// https://material-ui.com/components/avatars/
// https://material-ui.com/components/material-icons/

import SendText from './SendText';

const monthList = [
  'Jan', 'Feb', 'Mar',
  'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec',
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  posting: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'block',
    fontWeight: 'bold',
  },
  title: {
    flexGrow: 1,
    fontSize: `20px`,
    height: 40,
    fontFamily: 'Verdana',
    color: 'white',
  },
  drawer: {
    width: `100%`,
    flexShrink: 0,
  },
  drawerPaper: {
    width: `100%`,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 0,
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    background: `#4A154B`,
  },
  icons: {
    color: 'white',
  },
}));

const fetchChannelFeed = (setChannelFeed, chID) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  if (chID === '') {
    return;
  }
  fetch(`/v0/message/${chID}`, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((arr) => {
      setChannelFeed(arr);
    })
    .catch((error) => {
      console.log(error);
      setChannelFeed([]);
    });
};

/**
 * @return {object} JSX
 */
function ChannelFeed() {
  const classes = useStyles();

  const {value3, value4, value5} = React.useContext(WorkspaceContext);
  const [messageDrawerOpen, setMessageDrawerOpen] = value3;
  const [channelObj] = value4; // name, id.
  const [channelFeed, setChannelFeed] = value5;

  const handleDrawerClose = () => {
    setMessageDrawerOpen(false);
  };

  const chID = channelObj.id;

  React.useEffect(() => {
    fetchChannelFeed(setChannelFeed, chID);
  }, [chID, setChannelFeed]);

  const ChannelMessages = () => {
    const arr = [];
    for (let i = 0; i < channelFeed.length; i++) {
      const name = channelFeed[i]['name'];
      const d = new Date(channelFeed[i]['date']);
      let date = '';
      if (d === new Date()) {
        date += `${d.getHours()}:${d.getMinutes()}`;
      } else {
        date += `${monthList[d.getMonth()]} ${d.getDate()} at 
        ${d.getHours()}:${d.getMinutes()}`;
      }
      const content = channelFeed[i]['content'];
      const id = channelFeed[i]['id'];

      const jsx =
        <ListItem
          key={id}
          alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp"/>
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Grid container justifyContent="space-between">
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >{name}</Typography>
                  <Typography
                    className={classes.inline}
                    color="textSecondary"
                    align='right'>{date}
                  </Typography>
                </Grid>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body1"
                  color="textPrimary"
                >{content}</Typography>
              </React.Fragment>
            }
          />
        </ListItem>;
      arr.push(jsx);
    }

    return (
      <List
        className={classes.posting}>
        {arr}
      </List>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={messageDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <KeyboardArrowLeftIcon className={classes.icons}/>
          </IconButton>
          <Typography className={classes.title}>
            {channelObj.name}
          </Typography>
        </div>
        <ChannelMessages/>
        <SendText/>
      </Drawer>
    </div>
  );
}

export default ChannelFeed;
